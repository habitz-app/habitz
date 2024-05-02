package space.habitz.api.domain.quiz.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.ChildRepository;
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

	@Override
	public QuizHistoryDto getTodayQuiz(Member member) {
		Child child = childRepository.findByMember_Id(member.getId());
		LocalDate today = LocalDate.now();

		QuizHistory quizHistory = quizHistoryRepository.findByQuiz_DateAndChildId(today, child.getId())
			.orElseGet(() -> null);

		Quiz quiz = quizRepository.findByDate(today).orElseThrow(() -> new CustomNotFoundException("오늘의 퀴즈가 없습니다."));

		if (quizHistory == null) {
			return QuizHistoryDto
				.builder()
				.isSolved(false)
				.quizHistoryInfoDto(null)
				.quizInfoDto(
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
			.quizHistoryInfoDto(
				QuizHistoryInfoDto
					.builder()
					.isCorrect(quizHistory.isCorrect())
					.chosenAnswer(quizHistory.getChosenAnswer())
					.createdAt(quizHistory.getCreatedAt())
					.build()
			)
			.quizInfoDto(
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
	public QuizHistoryDto solveQuiz(Member member, String answer) {
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
			.createdAt(new java.sql.Timestamp(System.currentTimeMillis()))
			.build();

		quizHistoryRepository.save(quizHistory);

		return QuizHistoryDto
			.builder()
			.isSolved(true)
			.quizHistoryInfoDto(
				QuizHistoryInfoDto
					.builder()
					.isCorrect(quizHistory.isCorrect())
					.chosenAnswer(quizHistory.getChosenAnswer())
					.createdAt(quizHistory.getCreatedAt())
					.build()
			)
			.quizInfoDto(
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
