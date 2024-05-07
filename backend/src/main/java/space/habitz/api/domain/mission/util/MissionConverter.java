package space.habitz.api.domain.mission.util;

import java.time.LocalDate;

import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.global.type.StatusCode;

public class MissionConverter {

	/**
	 * 스케줄에서 미션으로 변환하는 메서드
	 * - 미션 create 하는 두 메서드에서 사용이 필요하므로, 메서드 구현
	 *
	 * @param schedule 일정
	 * @param date 미션 날짜
	 * @return Mission 미션 엔티티
	 * */
	public static Mission convertScheduleToMission(Schedule schedule, LocalDate date) {
		return Mission.builder()
			.schedule(schedule)
			.child(schedule.getChild())
			.parent(schedule.getParent())
			.content(schedule.getContent())
			.title(schedule.getTitle())
			.emoji(schedule.getEmoji())
			.point(schedule.getPoint())
			.date(date)
			.status(StatusCode.EMPTY)
			.isDeleted(false)
			.repeatable(schedule.getRepeatable())
			.build();
	}
}
