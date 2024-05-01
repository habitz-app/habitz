package space.habitz.api.domain.quiz.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizHistoryDto {
	Boolean isSolved;
	QuizInfoDto quizInfoDto;
	QuizHistoryInfoDto quizHistoryInfoDto;
}
