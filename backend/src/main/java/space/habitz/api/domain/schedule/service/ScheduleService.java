package space.habitz.api.domain.schedule.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.FamilyCustomRepositoryImpl;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.mission.repository.MissionRepository;
import space.habitz.api.domain.mission.util.MissionConverter;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.dto.ScheduleMissionDto;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.dto.UpdateScheduleRequestDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleCustomRepositoryImpl;
import space.habitz.api.domain.schedule.repository.ScheduleRepository;
import space.habitz.api.domain.schedule.util.ScheduleDateUtil;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;
import space.habitz.api.global.type.StatusCode;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleService {

	private final MemberRepository memberRepository;
	private final ScheduleRepository scheduleRepository;
	private final MissionRepository missionRepository;
	private final ScheduleCustomRepositoryImpl scheduleCustomRepository;
	private final FamilyCustomRepositoryImpl familyCustomRepository;

	/**
	 * 일정 생성
	 *
	 * @param member             로그인한 사용자
	 * @param scheduleRequestDto 일정 생성 요청 DTO
	 */
	@Transactional
	public Map<String, Long> createSchedule(Member member, ScheduleRequestDto scheduleRequestDto) {

		Member child = memberRepository.findByUuid(scheduleRequestDto.childUUID())
			.orElseThrow(() -> new CustomErrorException(ErrorCode.CHILD_NOT_FOUND));

		validateFamily(member.getFamily().getId(), child.getFamily().getId());    // 가족 관계 확인

		Schedule schedule = scheduleRequestDto.toEntity(member, child);
		scheduleRepository.save(schedule);

		// 오늘 날짜가 스케줄 시작일과 같은 경우, 즉시 미션 생성
		LocalDate today = LocalDate.now();
		if (today.isEqual(schedule.getStartDate()) && ScheduleDateUtil.isActiveDay(schedule, today)) {
			createMissionBySchedule(schedule);        // 미션 생성
		}

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
	 *
	 * @param member 로그인한 사용자
	 * @param date   조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getChildrenScheduleMissionList(Member member, LocalDate date) {

		// 가족 조회
		List<Member> children = familyCustomRepository.findByFamilyIdOnlyChildMember(member.getFamily().getId(), true);

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
	 * - 일정을 삭제하면, soft delete 로 is_delete를 활성화한다.
	 * - 오늘의 미션이 존재한다면, 삭제한다.
	 *
	 * @param member     로그인한 사용자 정보
	 * @param scheduleId 일정 ID
	 */
	@Transactional
	public String deleteSchedule(Member member, Long scheduleId) {

		Schedule schedule = scheduleRepository.findById(scheduleId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.SCHEDULE_NOT_FOUND));

		validateFamily(member.getFamily().getId(), schedule.getChild().getFamily().getId());    // 가족 관계 확인

		// 만약 일정을 삭제했을 때 "오늘" 부여된 미션이 존재한다면, 삭제
		Optional<Mission> optionalMission = missionRepository.findByScheduleIdAndDate(scheduleId, LocalDate.now());
		optionalMission.ifPresent(missionRepository::delete);

		scheduleRepository.delete(schedule);

		return scheduleId + " 일정이 삭제 되었습니다.";
	}

	// ======================== 일정 수정 관련 메서드 ============================

	/**
	 * 일정 수정
	 * - 일정을 수정한다.
	 * - 일정 수정 할 때 "오늘" 부여된 미션의 수정/삭제 여부를 검증한다.
	 * - 일정 수정 할 때 startDate의 변경으로 오늘 미션이 생성되야 하는 경우를 확인하고, 생성한다.
	 *
	 * @param member 로그인한 사용자
	 * @param scheduleId 수정할 일정
	 * @param requestDto 업데이트 하는 Dto
	 * */
	@Transactional
	public ScheduleDto updateSchedule(Member member, Long scheduleId, UpdateScheduleRequestDto requestDto) {

		Schedule schedule = scheduleRepository.findById(scheduleId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.SCHEDULE_NOT_FOUND));

		validateFamily(member.getFamily().getId(), schedule.getChild().getFamily().getId());    // 가족 관계 확인

		// "오늘" 날짜가 포함된 기존 미션이 있다면, 수정 및 삭제 한다.
		Optional<Mission> optionalMission = missionRepository.findByScheduleIdAndDate(scheduleId, LocalDate.now());
		optionalMission.ifPresent(mission -> {
			updateTodayMissionHandler(mission, requestDto);
		});

		// 수정에 따라 "오늘" 날짜에 미션이 생성되어야 한다면, 미션을 생성한다.
		checkTodayMissionCreation(schedule, requestDto.startDate());

		// schedule update
		schedule.updateSchedule(requestDto);
		return ScheduleDto.of(schedule);
	}

	/**
	 * 일정 변경사항으로 인해 "오늘"의 미션의 변동사항이 있는 경우
	 *
	 * 1. 원래 일정은 오늘을 포함한 기간이였으나, startDate가 오늘 이후이면, 미션은 [삭제] 되어야 한다.
	 * 2. 원래 일정은 오늘을 포함한 기간이였으나, 오늘에 기간이 침범되지 않는다면, 미션은 [수정] 된다.
	 *
	 * @param mission 미션
	 * @param requestDto 일정에 대해 업데이트 되는 요청 Dto
	 * */
	private void updateTodayMissionHandler(Mission mission, UpdateScheduleRequestDto requestDto) {
		LocalDate today = LocalDate.now();
		log.info("Checking the existing mission for today.");
		if (requestDto.startDate().isAfter(today)) {
			// 수정한 스케줄의 시작일이 미션의 날짜 보다 뒤에 있을 경우 삭제
			if (mission.getStatus().equals(StatusCode.ACCEPT)) {
				throw new CustomErrorException(ErrorCode.MISSION_ACCEPTED_CAN_NOT_DELETE);
			}
			missionRepository.delete(mission);
			log.info("Deleting today's assigned mission as the updated schedule's start date is after today.");
		} else {
			// 수정한 스케줄에 대한 미션 수정
			mission.updateSchedule(requestDto);
			log.info("Updating today's assigned mission as the updated schedule's start date includes today.");
		}
	}

	/**
	 * 일정의 변경으로, 미션을 생성해야 하는 경우
	 * - 일정 수정 할 때 startDate의 변경으로 오늘 미션이 생성되야 하는 경우를 확인하고, 생성한다.
	 *
	 * @param originalSchedule 수정 전 일정
	 * @param updateStartDate 변경한 일정의 startDate
	 * */
	private void checkTodayMissionCreation(Schedule originalSchedule, LocalDate updateStartDate) {
		LocalDate today = LocalDate.now();
		// 일정이 변경되면서 "오늘 날짜" 포함
		if (originalSchedule.getStartDate().isAfter(today) && !updateStartDate.isAfter(today)) {
			// 수정한 스케줄의 시작일이 오늘을 포함하도록 변경된 경우 미션 생성
			createMissionBySchedule(originalSchedule);
			log.info(
				"Creating a mission for today as the updated schedule's start date now includes today after the update.");
		}
	}

	// ======================== 일정 수정 관련 메서드 End ============================

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

	/**
	 * 스케줄 -> 미션 생성 메서드
	 * - 스케줄을 미션으로 변환하여, 미션에 저장한다.
	 *
	 * @param schedule 입력된 일정
	 * */
	public void createMissionBySchedule(Schedule schedule) {
		Mission mission = MissionConverter.convertScheduleToMission(schedule, LocalDate.now()); // 오늘 날짜의 미션 생성
		missionRepository.save(mission);
	}

}
