package space.habitz.api.domain.schedule.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.dto.ScheduleMissionDto;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleCustomRepositoryImpl;
import space.habitz.api.domain.schedule.repository.ScheduleRepository;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;

@Service
@RequiredArgsConstructor
public class ScheduleService {

	private final MemberRepository memberRepository;
	private final ScheduleRepository scheduleRepository;
	private final ScheduleCustomRepositoryImpl scheduleCustomRepository;

	/**
	 * 일정 생성
	 *
	 * @param member             로그인한 사용자
	 * @param scheduleRequestDto 일정 생성 요청 DTO
	 */
	public Map<String, Long> createSchedule(Member member, ScheduleRequestDto scheduleRequestDto) {

		Member child = memberRepository.findByUuid(scheduleRequestDto.childUUID())
			.orElseThrow(() -> new CustomErrorException(ErrorCode.CHILD_NOT_FOUND));

		validateFamily(member.getFamily().getId(), child.getFamily().getId());    // 가족 관계 확인

		Schedule schedule = scheduleRequestDto.toEntity(member, child);
		scheduleRepository.save(schedule);
		return Map.of("scheduleId", schedule.getId());
	}

	/**
	 * 일정 상세 조회
	 *
	 * @param member     로그인한 사용자
	 * @param scheduleId 일정 ID
	 */
	@Transactional(readOnly = true)
	public ScheduleDto getScheduleDetail(Member member, Long scheduleId) {

		Schedule schedule = scheduleRepository.findById(scheduleId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.SCHEDULE_NOT_FOUND));

		validateFamily(member.getFamily().getId(), schedule.getChild().getFamily().getId());    // 가족 관계 확인

		return ScheduleDto.of(schedule);
	}

	/**
	 * 일정(미션) 목록 조회
	 * - 로그인한 사용자의 일정 목록을 조회한다.
	 * - 일정은 날짜로 부여될 때 "미션"과 동일한 형태로 return 한다.
	 * - 일정은 status가 존재하지 않는다.
	 *
	 * @param member 로그인한 사용자
	 * @param date  조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<ScheduleMissionDto> getScheduleMissionList(Member member, LocalDate date) {
		List<Schedule> scheduleList = scheduleCustomRepository.findByDateWithChildId(date, member.getId());

		return scheduleList.stream()
			.map(ScheduleMissionDto::of)
			.toList();
	}

	/**
	 * 부모가 자식들의 미션 목록을 조회
	 * - 로그인 한 유저의 아이 목록을 조회한다.
	 * - 날짜를 기준으로 아이들의 미션 목록을 조회한다.
	 * - TODO :: 아이 기준으로 조회 -> 생년월일 순으로 조회되도록 QueryDSL 사용해야함
	 *
	 * @param member 로그인한 사용자
	 * @param date   조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getChildrenScheduleMissionList(Member member, LocalDate date) {

		// 가족 조회
		Family family = member.getFamily();
		List<Member> children = memberRepository.findByFamilyIdAndRole(family.getId(), Role.CHILD);

		// 가족의 자식 목록 조회
		List<Map<String, Object>> totalScheduleMissionList = new ArrayList<>();
		for (Member child : children) {
			MemberProfileDto childInfo = MemberProfileDto.of(child);
			// 자식들의 일정(미션) 목록 조회
			List<ScheduleMissionDto> scheduleMissionDtoList = getScheduleMissionList(child, date);
			totalScheduleMissionList.add(Map.of("childInfo", childInfo, "schedules", scheduleMissionDtoList));
		}
		return totalScheduleMissionList;
	}

	/**
	 * 부모 유저가 특정 자식의 미션 목록을 조회
	 * - 부모 유저와 child의 가족 관계가 성립해야 한다.
	 *
	 * @param member    로그인한 사용자
	 * @param childUUID 조회할 자식의 UUID
	 * @param date      조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<ScheduleMissionDto> getChildScheduleMissionList(Member member, LocalDate date, String childUUID) {
		// 자식의 정보 조회
		Member child = memberRepository.findByUuid(childUUID)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.CHILD_NOT_FOUND));

		validateFamily(member.getFamily().getId(), child.getFamily().getId());

		// 자식의 scheduleMission 조회
		return getScheduleMissionList(child, date);
	}

	/**
	 * 일정 삭제
	 *
	 * @param member     로그인한 사용자 정보
	 * @param scheduleId 일정 ID
	 */
	public String deleteSchedule(Member member, Long scheduleId) {

		// schedule을 기준으로 today ~ endDate 까지의 일정을 모두 삭제

		scheduleRepository.deleteById(scheduleId);
		return scheduleId + " 일정이 삭제 되었습니다.";
	}

	/**
	 * 같은 가족인지 확인하는 validation
	 *
	 * @param memberFamilyId 가족 관계를 확인할 사용자
	 * @param childFamilyId  가족 관계를 확인할 사용자
	 */
	public void validateFamily(String memberFamilyId, String childFamilyId) {
		if (!memberFamilyId.equals(childFamilyId)) {
			throw new CustomErrorException(ErrorCode.FAMILY_NOT_MATCH);
		}
	}

}
