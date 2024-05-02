package space.habitz.api.domain.quiz.dto;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class QuizHistoryInfoDto {

	private String chosenAnswer;

	private boolean isCorrect;

	private Timestamp createdAt;
}
