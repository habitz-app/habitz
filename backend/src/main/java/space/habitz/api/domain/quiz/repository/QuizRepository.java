package space.habitz.api.domain.quiz.repository;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.quiz.entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	Optional<Quiz> findByDate(LocalDate date);

}
