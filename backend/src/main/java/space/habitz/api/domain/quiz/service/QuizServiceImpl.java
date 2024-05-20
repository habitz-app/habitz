package space.habitz.api.domain.quiz.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.point.entity.ChildPointHistory;
import space.habitz.api.domain.point.repository.ChildPointHistoryRepository;
import space.habitz.api.domain.quiz.dto.QuizHistoryDto;
import space.habitz.api.domain.quiz.dto.QuizHistoryInfoDto;
import space.habitz.api.domain.quiz.dto.QuizInfoDto;
import space.habitz.api.domain.quiz.entity.Quiz;
import space.habitz.api.domain.quiz.entity.QuizHistory;
import space.habitz.api.domain.quiz.repository.QuizHistoryRepository;
import space.habitz.api.domain.quiz.repository.QuizRepository;
import space.habitz.api.global.exception.CustomNotFoundException;

@RequiredArgsConstructor
@Service
public class QuizServiceImpl implements QuizService {
	private final QuizRepository quizRepository;
	private final QuizHistoryRepository quizHistoryRepository;
	private final ChildRepository childRepository;
	private final ChildPointHistoryRepository childPointHistoryRepository;

	@Override
	public QuizHistoryDto getTodayQuiz(Member member) {
		if (member.getRole() != Role.CHILD) {
			throw new CustomNotFoundException("아이만 퀴즈를 풀 수 있습니다.");
		}

		Child child = childRepository.findByMember_Id(member.getId());
		LocalDate today = LocalDate.now();

		QuizHistory quizHistory = quizHistoryRepository.findByQuiz_DateAndChildId(today, child.getId())
			.orElseGet(() -> null);

		Quiz quiz = quizRepository.findByDate(today).orElseThrow(() -> new CustomNotFoundException("오늘의 퀴즈가 없습니다."));

		if (quizHistory == null) {
			return QuizHistoryDto
				.builder()
				.isSolved(false)
				.quizHistoryInfo(null)
				.quizInfo(
					QuizInfoDto
						.builder()
						.id(quiz.getId())
						.content(quiz.getContent())
						.createdAt(quiz.getDate())
						.build()
				)
				.build();
		}
		return QuizHistoryDto
			.builder()
			.isSolved(true)
			.quizHistoryInfo(
				QuizHistoryInfoDto
					.builder()
					.articleId(quiz.getArticle().getId())
					.isCorrect(quizHistory.isCorrect())
					.chosenAnswer(quizHistory.getChosenAnswer())
					.createdAt(quizHistory.getCreatedAt())
					.build()
			)
			.quizInfo(
				QuizInfoDto
					.builder()
					.id(quiz.getId())
					.content(quiz.getContent())
					.createdAt(quiz.getDate())
					.build()
			)
			.build();

	}

	@Override
	@Transactional
	public QuizHistoryDto solveQuiz(Member member, String answer) {
		if (member.getRole() != Role.CHILD) {
			throw new CustomNotFoundException("아이만 퀴즈를 풀 수 있습니다.");
		}
		Child child = childRepository.findByMember_Id(member.getId());
		LocalDate today = LocalDate.now();
		Quiz quiz = quizRepository.findByDate(today).orElseThrow(() -> new CustomNotFoundException("오늘의 퀴즈가 없습니다."));

		quizHistoryRepository.findByChildAndQuiz(child, quiz).ifPresent(quizHistory -> {
			throw new CustomNotFoundException("이미 푼 퀴즈입니다.");
		});
		
		QuizHistory quizHistory = QuizHistory
			.builder()
			.quiz(quiz)
			.child(child)
			.chosenAnswer(answer)
			.isCorrect(quiz.getAnswer().equals(answer))
			.build();

		quizHistoryRepository.save(quizHistory);
		if (quizHistory.isCorrect()) {
			child.setQuizPoint(child.getPoint() + 10);
			childRepository.save(child);

			ChildPointHistory childPointHistory = ChildPointHistory.builder()
				.child(child)
				.content(LocalDate.now() + " 퀴즈 정답 맞춤")
				.totalPoint(child.getPoint())
				.point(10)
				.build();
			childPointHistoryRepository.save(childPointHistory);

		}
		return QuizHistoryDto
			.builder()
			.isSolved(true)
			.quizHistoryInfo(
				QuizHistoryInfoDto
					.builder()
					.articleId(quiz.getArticle().getId())
					.isCorrect(quizHistory.isCorrect())
					.chosenAnswer(quizHistory.getChosenAnswer())
					.createdAt(quizHistory.getCreatedAt())
					.build()
			)
			.quizInfo(
				QuizInfoDto
					.builder()
					.id(quiz.getId())
					.content(quiz.getContent())
					.createdAt(quiz.getDate())
					.build()
			)
			.build();
	}
}
