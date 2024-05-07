package space.habitz.api.domain.schedule.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.mission.repository.MissionRepository;
import space.habitz.api.domain.schedule.dto.CalendarDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleCustomRepositoryImpl;

@Service
@RequiredArgsConstructor
public class CalendarService {

	private final MemberRepository memberRepository;
	private final MissionRepository missionRepository;
	private final ScheduleCustomRepositoryImpl scheduleCustomRepository;

	/**
	 * 캘린더에서 일정 조회
	 * - 캘린더에서 일정을 조회합니다.
	 * - 일정을 조회할 때는 해당 일정이 속한 월을 기준으로 조회합니다.
	 *
	 * @param member 로그인한 사용자
	 * @param year 조회할 년도
	 * @param month 조회할 월
	 * */
	public Map<?, ?> getCalendar(Member member, int year, int month) {
		// 달력 조회 날짜 기간
		YearMonth yearMonth = YearMonth.of(year, month);

		// 로그인 유저의 아이들 조회
		Family family = member.getFamily();
		List<Member> children = memberRepository.findByFamilyIdAndRole(family.getId(), Role.CHILD);

		// 조회한 "yyyy-MM"에 대하여, 아이의 미션, 일정이 존재하는지 date를 기준으로 반환
		List<CalendarDto> calendarList = new ArrayList<>();
		for (Member child : children) {
			MemberProfileDto childProfile = MemberProfileDto.of(child);                // 아이 프로필
			List<LocalDate> daysList = getCalendarByMonth(yearMonth, child);        // 아이가 가지고 있는 일정(미션, 스케줄) 목록
			calendarList.add(
				CalendarDto.builder()
					.child(childProfile)
					.days(sortDayList(daysList))
					.build()
			);
		}

		return Map.of("month", yearMonth, "calendar", calendarList);
	}

	// =================================================================================
	//		 					Calendar 조회를 위한 메서드
	// =================================================================================

	/**
	 * 월에 대한 조건에 따라 결과 반환
	 * - 달력은 과거 ~ 오늘 날짜까지 "미션"이 존재하는 지 확인한다.
	 * - 달력은 오늘 이후 (미포함) 날짜는 "스케줄"이 존재하는 지 확인한다.
	 * - 미션과 스케줄을 달력에 일정을 표시한다.
	 *
	 * @param yearMonth 조회하는 년/월
	 * @param child 조회 대상
	 * */
	private List<LocalDate> getCalendarByMonth(YearMonth yearMonth, Member child) {
		LocalDate firstDayOfMonth = yearMonth.atDay(1);
		LocalDate endDayOfMonth = yearMonth.atEndOfMonth();
		LocalDate today = LocalDate.now();

		// 이번달의 경우
		if (yearMonth.equals(YearMonth.from(today))) {
			// 과거 ~ 오늘까지 미션 리스트를 조회
			List<LocalDate> missionDateList = convertMissionToLocalDate(
				missionRepository.findByChildIdAndDateBetween(child.getId(), firstDayOfMonth, today)
			);
			// 오늘 이후부터 달이 끝날 때까지 스케줄 리스트를 조회
			LocalDate tomorrow = today.plusDays(1);
			List<LocalDate> scheduleDateList = convertScheduleToLocalDate(
				scheduleCustomRepository.findCalendarByMonthWithChildId(child.getId(), tomorrow,
					endDayOfMonth),
				tomorrow, endDayOfMonth
			);
			// 두 date 목록의 중복이 없도록 변환
			return Stream.concat(missionDateList.stream(), scheduleDateList.stream())
				.distinct()
				.collect(Collectors.toList());

			// 이전 달인 경우
		} else if (yearMonth.isBefore(YearMonth.from(today))) {
			// 과거 진행했던 미션 목록 조회
			return convertMissionToLocalDate(
				missionRepository.findByChildIdAndDateBetween(child.getId(), firstDayOfMonth, endDayOfMonth)
			);

			// 다음 달인 경우
		} else {
			// 이후 달에 진행 예정인 스케줄 목록 조회
			return convertScheduleToLocalDate(
				scheduleCustomRepository.findCalendarByMonthWithChildId(child.getId(),
					firstDayOfMonth, endDayOfMonth), firstDayOfMonth, endDayOfMonth
			);
		}
	}

	/**
	 * Mission To LocalDate
	 * - 미션을 가지는 date 추출
	 *
	 * @param missionList 날짜에 해당하는 미션 목록
	 * */
	private List<LocalDate> convertMissionToLocalDate(List<Mission> missionList) {
		return missionList.stream()
			.map(Mission::getDate)
			.collect(Collectors.toList());
	}

	/**
	 * Schedule To LocalDate
	 * - 스케줄 내에 포함된 date의 목록 반환
	 * - 예) 5월 1일 부터 5월 10일까지 월수금 의 주기를 갖는 다면, 5/1, 5/3, 5/6, 5/8, 5/10의 date 목록을 갖는다.
	 * - 여러 스케줄에서 추출한 date목록은 최종 반환할 때 중복을 제거한다.
	 *
	 * @param scheduleList    날짜에 해당하는 일정 목록
	 * @param start    조회 시작 일자
	 * @param end        조회 종료 일자
	 * */
	private List<LocalDate> convertScheduleToLocalDate(List<Schedule> scheduleList, LocalDate start, LocalDate end) {
		// 스케줄 목록 내에서 Date 목록을 생성한다.
		return scheduleList.stream()
			.flatMap(schedule -> generateDates(schedule, start, end).stream())
			.distinct() // 중복 제거
			.collect(Collectors.toList());
	}

	/**
	 * 일정 내에 존재하는 dates 생성 메서드
	 *
	 * @param schedule        변환할 스케줄
	 * @param start        조회 시작 기준
	 * @param end            조회 종료 기준
	 * */
	private List<LocalDate> generateDates(Schedule schedule, LocalDate start, LocalDate end) {
		LocalDate current =
			schedule.getStartDate().isBefore(start) ? start : schedule.getStartDate(); // "달"을 기준으로 조회 시작 시점 지정
		LocalDate scheduleEnd =
			schedule.getEndDate().isAfter(end) ? end : schedule.getEndDate(); // "달"을 기준으로 조회 종료 시점 지정

		List<LocalDate> dateList = new ArrayList<>();
		while (!current.isAfter(scheduleEnd)) {
			// 반복 요일에 해당하는 지 확인
			if (isActiveDay(schedule, current)) {
				dateList.add(current);
			}
			current = current.plusDays(1); // 다음 날
		}
		return dateList;
	}

	/**
	 * 일정에 해당하는 요일 여부 확인
	 * - date가 스케줄 내에서 요일에 부합한지 검증
	 *
	 * @param schedule 일정 엔티티
	 * @param date 조회할 대상 date
	 * */
	private boolean isActiveDay(Schedule schedule, LocalDate date) {

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
	private List<LocalDate> sortDayList(List<LocalDate> dateList) {
		Collections.sort(dateList);
		return dateList;
	}

}
