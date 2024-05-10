package space.habitz.api.domain.schedule.dto;

import lombok.Builder;

@Builder
public record ScheduleIdDto(
	Long scheduleId
) {
	public static ScheduleIdDto of(Long scheduleId) {
		return ScheduleIdDto.builder()
			.scheduleId(scheduleId)
			.build();
	}
}
