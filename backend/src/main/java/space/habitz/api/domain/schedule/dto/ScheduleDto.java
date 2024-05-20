package space.habitz.api.domain.schedule.dto;

import java.time.LocalDate;

import lombok.Builder;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.schedule.entity.Schedule;

@Builder
public record ScheduleDto(
	Long scheduleId,
	String title,
	String content,
	String emoji,
	MemberProfileDto child,
	LocalDate startDate,
	LocalDate endDate,
	Boolean[] weekDays,
	int point
) {

	public static ScheduleDto of(Schedule schedule) {
		return ScheduleDto.builder()
			.scheduleId(schedule.getId())
			.title(schedule.getTitle())
			.content(schedule.getContent())
			.emoji(schedule.getEmoji())
			.child(
				// 아이의 member Profile 정보
				MemberProfileDto.of(schedule.getChild()))
			.startDate(schedule.getStartDate())
			.endDate(schedule.getEndDate())
			.weekDays(
				new Boolean[] {
					schedule.getMonday(),
					schedule.getTuesday(),
					schedule.getWednesday(),
					schedule.getThursday(),
					schedule.getFriday(),
					schedule.getSaturday(),
					schedule.getSunday()
				})
			.point(schedule.getPoint())
			.build();
	}

}
