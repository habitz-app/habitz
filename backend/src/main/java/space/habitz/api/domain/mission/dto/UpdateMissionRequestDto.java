package space.habitz.api.domain.mission.dto;

import java.time.LocalDate;

import lombok.Builder;

@Builder
public record UpdateMissionRequestDto(
	String title,
	String content,
	String emoji,
	int point,
	LocalDate date

) {
}
