package space.habitz.api.domain.quiz.service;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.quiz.dto.QuizHistoryDto;

public interface QuizService {

	QuizHistoryDto getTodayQuiz(Member member);

	QuizHistoryDto solveQuiz(Member member, String answer);
}
