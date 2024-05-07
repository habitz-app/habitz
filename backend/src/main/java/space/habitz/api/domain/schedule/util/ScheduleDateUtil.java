package space.habitz.api.domain.schedule.util;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import space.habitz.api.domain.schedule.entity.Schedule;

public class ScheduleDateUtil {

	/**
	 * 일정에 해당하는 요일 여부 확인
	 * - date가 스케줄 내에서 요일에 부합한지 검증
	 *
	 * @param schedule 일정 엔티티
	 * @param date 조회할 대상 date
	 * */
	public static boolean isActiveDay(Schedule schedule, LocalDate date) {

		return switch (date.getDayOfWeek()) {
			case MONDAY -> schedule.getMonday();
			case TUESDAY -> schedule.getTuesday();
			case WEDNESDAY -> schedule.getWednesday();
			case THURSDAY -> schedule.getThursday();
			case FRIDAY -> schedule.getFriday();
			case SATURDAY -> schedule.getSaturday();
			case SUNDAY -> schedule.getSunday();
			default -> false;
		};
	}

	/**
	 * LocalDate를 기준으로 정렬
	 * - 명시적인 표현하기 위해 메서드 생성
	 *
	 * @param dateList date 목록
	 * */
	public static List<LocalDate> sortDayList(List<LocalDate> dateList) {
		Collections.sort(dateList);
		return dateList;
	}
}
