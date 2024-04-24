package space.habitz.api.domain.schedule.dto;

import lombok.Builder;
import space.habitz.api.domain.schedule.entity.Schedule;

import java.time.LocalDate;

@Builder
public record ScheduleRequestDto(
	String title,
	String content,
	String emoji,
	String childUUID,
	LocalDate startDate,
	LocalDate endDate,
	Boolean[] weekDays, // size 7
	Integer point
) {

	public Schedule toEntity() {
		return Schedule.builder()
			.title(title)
			.content(content)
			.emoji(emoji)
			.startDate(startDate)
			.endDate(endDate)
			.monday(weekDays[0])
			.tuesday(weekDays[1])
			.wednesday(weekDays[2])
			.thursday(weekDays[3])
			.friday(weekDays[4])
			.saturday(weekDays[5])
			.sunday(weekDays[6])
			.point(point)
			.build();
	}
}
