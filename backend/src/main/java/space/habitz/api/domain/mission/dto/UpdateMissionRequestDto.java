package space.habitz.api.domain.mission.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import space.habitz.api.global.validator.emoji.Emoji;

@Builder
public record UpdateMissionRequestDto(
	@Size(max = 64, message = "미션 제목은 64자를 넘을 수 없습니다.")
	String title,
	@Size(max = 255, message = "미션 내용은 255자를 넘을 수 없습니다.")
	String content,
	@Emoji
	String emoji,
	int point,
	LocalDate date

) {
}
