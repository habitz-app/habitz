package space.habitz.api.domain.schedule.repository;

import static space.habitz.api.domain.schedule.entity.QSchedule.*;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.schedule.entity.Schedule;

@Repository
@RequiredArgsConstructor
public class ScheduleCustomRepositoryImpl implements ScheduleCustomRepository {

	private final JPAQueryFactory queryFactory;

	@Override
	public List<Schedule> findByDate(LocalDate date) {
		BooleanExpression dateCondition = dateCondition(date);
		BooleanExpression dayOfWeekCondition = dayOfWeekCondition(date);
		return queryFactory
			.selectFrom(schedule)
			.where(dateCondition.and(dayOfWeekCondition))
			.fetch();
	}

	@Override
	public List<Schedule> findByDateWithChildId(LocalDate date, Long memberId) {
		BooleanExpression memberCondition = schedule.child.id.eq(memberId);
		return queryFactory
			.selectFrom(schedule)
			.where(memberCondition
				.and(dateCondition(date))
				.and(dayOfWeekCondition(date)))
			.fetch();
	}

	@Override
	public BooleanExpression dateCondition(LocalDate date) {
		// 주어진 date가 startDate와 endDate 사이에 있는지 검사하는 조건
		return schedule.startDate.loe(date)
			.and(schedule.endDate.goe(date));
	}

	@Override
	public BooleanExpression dayOfWeekCondition(LocalDate date) {

		int dayOfWeekIndex = date.getDayOfWeek().getValue() - 1;

		return switch (date.getDayOfWeek()) {
			case MONDAY -> schedule.monday.isTrue();
			case TUESDAY -> schedule.tuesday.isTrue();
			case WEDNESDAY -> schedule.wednesday.isTrue();
			case THURSDAY -> schedule.thursday.isTrue();
			case FRIDAY -> schedule.friday.isTrue();
			case SATURDAY -> schedule.saturday.isTrue();
			case SUNDAY -> schedule.sunday.isTrue();
			default -> null;  // 이 경우가 발생하지 않도록 요일 정보는 항상 유효함
		};
	}
}
