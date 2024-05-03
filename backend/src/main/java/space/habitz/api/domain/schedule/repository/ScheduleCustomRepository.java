package space.habitz.api.domain.schedule.repository;

import java.time.LocalDate;
import java.util.List;

import com.querydsl.core.types.dsl.BooleanExpression;

import space.habitz.api.domain.schedule.entity.Schedule;

public interface ScheduleCustomRepository {

	/**
	 * 조회 요일을 기준으로 리스트 찾기
	 *
	 * @param date 조회할 일자
	 */
	List<Schedule> findByDate(LocalDate date);

	/**
	 * 조회 요일을 기준으로 리스트 찾기
	 *
	 * @param date 조회할 일자
	 * @param memberId 조회할 회원의 memberId
	 * */
	List<Schedule> findByDateWithChildId(LocalDate date, Long memberId);

	/**
	 * 조회 날짜에 따른 일정 조건 만들기
	 *
	 * @param date 조회할 일자
	 * */
	BooleanExpression dateCondition(LocalDate date);

	/**
	 * 조회 날짜에 따른 요일 조건 만들기
	 *
	 * @param date 조회할 일자
	 * */
	BooleanExpression dayOfWeekCondition(LocalDate date);

}
