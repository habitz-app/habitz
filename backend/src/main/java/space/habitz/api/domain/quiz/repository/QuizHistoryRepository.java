package space.habitz.api.domain.quiz.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.quiz.entity.Quiz;
import space.habitz.api.domain.quiz.entity.QuizHistory;

public interface QuizHistoryRepository extends JpaRepository<QuizHistory, Long> {

	Optional<QuizHistory> findByQuiz_DateAndChildId(LocalDate date, Long childId);

	Optional<QuizHistory> findByChildAndQuiz(Child child, Quiz quiz);
}
