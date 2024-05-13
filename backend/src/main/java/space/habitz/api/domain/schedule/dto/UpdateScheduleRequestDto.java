package space.habitz.api.domain.schedule.dto;

import java.time.LocalDate;

import lombok.Builder;

@Builder
@ValidSchedule
public record UpdateScheduleRequestDto(
	String title,
	String content,
	String emoji,
	LocalDate startDate,
	LocalDate endDate,
	Boolean[] weekDays,
	Integer point
) {
}
