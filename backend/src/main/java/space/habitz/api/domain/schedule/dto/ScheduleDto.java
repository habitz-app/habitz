package space.habitz.api.domain.schedule.dto;

import lombok.Builder;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.schedule.entity.Schedule;

import java.time.LocalDate;

@Builder
public record ScheduleDto(
	Long scheduleId,
	String title,
	String content,
	String emoji,
	MemberProfileDto member,
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
			.member(
				// 아이의 member Profile 정보
				MemberProfileDto.builder()
					.name(schedule.getChild().getName())
					.UUID(schedule.getChild().getUuid())
					.build())
			.startDate(schedule.getStartDate())
			.endDate(schedule.getEndDate())
			.weekDays(
				new Boolean[]{
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
