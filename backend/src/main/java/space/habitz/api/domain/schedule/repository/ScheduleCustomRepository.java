package space.habitz.api.domain.schedule.repository;

import space.habitz.api.domain.schedule.entity.Schedule;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleCustomRepository {

	/**
	 * 조회 요일을 기준으로 리스트 찾기
	 *
	 * @param date 조회할 일자
	 */
	List<Schedule> findSchedulesByDate(LocalDate date);
}
