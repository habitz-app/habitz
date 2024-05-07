package space.habitz.api.domain.mission.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.mission.dto.MissionDto;
import space.habitz.api.domain.mission.dto.UpdateMissionRequestDto;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.mission.repository.MissionRepository;
import space.habitz.api.domain.mission.util.MissionConverter;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleCustomRepositoryImpl;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;
import space.habitz.api.global.type.StatusCode;

@Slf4j
@Service
@RequiredArgsConstructor
public class MissionService {

	private final MissionRepository missionRepository;
	private final MemberRepository memberRepository;
	private final ScheduleCustomRepositoryImpl scheduleCustomRepository;

	/**
	 * 미션 상세 조회
	 *
	 * @param missionId 미션 ID
	 */
	@Transactional
	public MissionDto getMissionDetail(Long missionId) {
		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));
		return MissionDto.of(mission);
	}

	/**
	 * 미션 삭제
	 * - ACCEPT 일 경우 삭제가 불가능하다.
	 * - Mission은 Soft Delete로 처리한다. // Mission Entity에서 SQLDelete 어노테이션 Overriding 사용
	 *
	 * @param member 로그인한 사용자
	 * @param missionId 미션 ID
	 */
	public Map<String, Long> deleteMission(Member member, Long missionId) {

		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));

		if (mission.getStatus().equals(StatusCode.ACCEPT)) {
			throw new CustomErrorException(ErrorCode.MISSION_ACCEPTED_CAN_NOT_DELETE);
		}

		missionRepository.delete(mission);
		return Map.of("missionId", missionId);
	}

	/**
	 * 미션 수정
	 * - 일정 수정이 아닌 한개의 미션에 대한 수정
	 * - Status는 수정 불가능
	 * - 미션의 날짜 변경 가능
	 *
	 * @param member 로그인한 사용자
	 * @param missionId 미션 ID
	 * @param requestDto 미션 수정 요청 DTO
	 * */
	@Transactional
	public MissionDto updateMission(Member member, Long missionId, UpdateMissionRequestDto requestDto) {

		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));

		mission.updateMission(requestDto);
		return MissionDto.of(mission);
	}

	/**
	 * 미션 목록 조회
	 * - 로그인한 사용자의 미션 목록을 조회한다.
	 * - 날짜를 기준으로 미션 목록을 조회한다.
	 *
	 * @param member 로그인한 사용자
	 * @param date 조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<MissionDto> getMissionList(Member member, LocalDate date) {
		List<Mission> missionList = missionRepository.findByChildIdAndDate(member.getId(), date);

		return missionList.stream()
			.map(MissionDto::of)
			.toList();
	}

	/**
	 * 부모가 자식들의 미션 목록을 조회
	 * - 로그인 한 유저의 아이 목록을 조회한다.
	 * - 날짜를 기준으로 아이들의 미션 목록을 조회한다.
	 * - TODO:: 아이 기준으로 조회 -> 생년월일 순으로 조회되도록 QueryDSL 사용해야함
	 *
	 * @param member 로그인한 사용자
	 * @param date 조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getChildrenMissionList(Member member, LocalDate date) {

		// 가족 조회
		Family family = member.getFamily();
		List<Member> children = memberRepository.findByFamilyIdAndRole(family.getId(), Role.CHILD);

		// 가족의 자식 목록 조회
		List<Map<String, Object>> totalMissionList = new ArrayList<>();
		for (Member child : children) {
			MemberProfileDto childInfo = MemberProfileDto.of(child);
			// 자식들의 미션 목록 조회
			List<MissionDto> missionDtoList = getMissionList(child, date);
			totalMissionList.add(Map.of("childInfo", childInfo, "missions", missionDtoList));
		}

		return totalMissionList;
	}

	/**
	 * 부모 유저가 특정 자식의 미션 목록을 조회
	 * - 부모 유저와 child의 가족 관계가 성립해야 한다.
	 *
	 * @param member 로그인한 사용자
	 * @param childUUID 조회할 자식의 UUID
	 * @param date 조회할 날짜
	 * */
	@Transactional(readOnly = true)
	public List<MissionDto> getChildMissionList(Member member, String childUUID, LocalDate date) {
		// 자식의 정보 조회
		Member child = memberRepository.findByUuid(childUUID)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MEMBER_NOT_FOUND));

		validateFamily(member.getFamily().getId(), child.getFamily().getId());    // 가족 관계 확인

		// 자식의 missionList 조회 (날짜 기준)
		return getMissionList(child, date);
	}

	/**
	 * 미션 생성
	 * - 당일 생성되는 미션을 위해 Service 레이어에서 생성
	 * - createSchedule 부분에서 메서드 호출
	 *
	 * @param schedule 입력된 일정
	 * */
	public Long createMission(Schedule schedule) {
		Mission mission = MissionConverter.convertScheduleToMission(schedule, LocalDate.now()); // 오늘 날짜의 미션 생성
		missionRepository.save(mission);
		return mission.getId();
	}

	/**
	 * 미션 생성 스케줄러
	 * - 매일 자정 00시 00분 00초에 실행
	 * - 오늘 날짜에 해당하는 스케줄을 조회하여 미션을 생성한다.
	 */
	@Transactional
	@Scheduled(cron = "0 0 0 * * ?")
	public void generateDailyMissions() {

		log.info("Scheduled generateDailyMissions started");
		LocalDate today = LocalDate.now();

		List<Schedule> scheduleList = scheduleCustomRepository.findByDate(today);
		log.info("Make mission list size: {}", scheduleList.size());

		// From Schedule To Daily Mission
		List<Mission> missionList = scheduleList.stream()
			.map(schedule -> MissionConverter.convertScheduleToMission(schedule, today))
			.collect(Collectors.toList());

		missionRepository.saveAll(missionList);
		log.info("Scheduled generateDailyMissions finished");
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
