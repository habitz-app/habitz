package space.habitz.api.domain.schedule.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import space.habitz.api.domain.schedule.entity.Schedule;

@Builder
public record ScheduleMissionDto(
	Long scheduleId,
	String title,
	String content,
	String emoji,
	int point,
	boolean repeat,
	LocalDateTime createdAt,
	String createdBy
) {
	public static ScheduleMissionDto of(Schedule schedule) {

		return ScheduleMissionDto.builder()
			.scheduleId(schedule.getId())
			.title(schedule.getTitle())
			.content(schedule.getContent())
			.emoji(schedule.getEmoji())
			.point(schedule.getPoint())
			.repeat(schedule.getRepeatable())
			.createdAt(schedule.getCreatedAt())
			.createdBy(schedule.getParent().getName())
			.build();

	}
}
