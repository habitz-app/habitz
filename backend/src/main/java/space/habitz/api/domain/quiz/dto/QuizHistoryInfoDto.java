package space.habitz.api.domain.quiz.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class QuizHistoryInfoDto {
	private Long articleId;
	private String chosenAnswer;
	private boolean isCorrect;
	private LocalDateTime createdAt;
}
