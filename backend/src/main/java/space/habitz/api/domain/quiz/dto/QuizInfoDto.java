package space.habitz.api.domain.quiz.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class QuizInfoDto {
	Long id;
	String title;

	String content;

	LocalDate createdAt;
}
