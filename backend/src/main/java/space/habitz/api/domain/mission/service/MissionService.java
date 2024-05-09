package space.habitz.api.domain.mission.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.mission.dto.MissionApprovalDto;
import space.habitz.api.domain.mission.dto.MissionApproveRequestDto;
import space.habitz.api.domain.mission.dto.MissionDto;
import space.habitz.api.domain.mission.dto.MissionRecognitionDto;
import space.habitz.api.domain.mission.dto.MissionResponseDto;
import space.habitz.api.domain.mission.dto.UpdateMissionRequestDto;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.mission.entity.MissionRecognition;
import space.habitz.api.domain.mission.repository.MissionRecognitionRepository;
import space.habitz.api.domain.mission.repository.MissionRepository;
import space.habitz.api.domain.mission.util.MissionConverter;
import space.habitz.api.domain.point.entity.ChildPointHistory;
import space.habitz.api.domain.point.entity.FamilyPointHistory;
import space.habitz.api.domain.point.repository.ChildPointHistoryRepository;
import space.habitz.api.domain.point.repository.FamilyPointHistoryRepository;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleCustomRepositoryImpl;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.CustomValidationException;
import space.habitz.api.global.exception.ErrorCode;
import space.habitz.api.global.type.StatusCode;
import space.habitz.api.global.util.fileupload.dto.UploadedFileResponseDto;
import space.habitz.api.global.util.fileupload.service.S3FileUploadService;

@Slf4j
@Service
@RequiredArgsConstructor
public class MissionService {

	// Mission & Schedule
	private final MissionRepository missionRepository;
	private final MissionRecognitionRepository missionRecognitionRepository;
	private final ScheduleCustomRepositoryImpl scheduleCustomRepository;
	// Member (Member, Child, Family)
	private final MemberRepository memberRepository;
	private final FamilyRepository familyRepository;
	private final ChildRepository childRepository;
	// Point
	private final ChildPointHistoryRepository childPointHistoryRepository;
	private final FamilyPointHistoryRepository familyPointHistoryRepository;
	// Common
	private final S3FileUploadService fileUploadService;

	/**
	 * 미션 상세 조회
	 *
	 * @param missionId 미션 ID
	 */
	@Transactional
	public MissionResponseDto getMissionDetail(Long missionId) {
		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));
		MissionRecognition missionRecognition = mission.getMissionRecognition();
		if (missionRecognition != null) {
			// 인증 내용이 존재하면 함께 return
			return getMissionRecognition(mission, MissionRecognitionDto.of(missionRecognition));
		}
		return MissionResponseDto.of(MissionDto.of(mission), null, null);
	}

	/**
	 * 미션에 인증 정보가 존재할 경우
	 * */
	private MissionResponseDto getMissionRecognition(Mission mission, MissionRecognitionDto missionRecognition) {
		// 인증 내용이 존재하면 함께 return
		if (mission.getStatus().equals(StatusCode.ACCEPT) || mission.getStatus().equals(StatusCode.DECLINE)) {
			return MissionResponseDto.of(MissionDto.of(mission), missionRecognition,
				MissionApprovalDto.of(mission.getApproveParent().getName(), mission.getComment()));
		}
		// 승인 내역이 없고, 인증 상태만 있는 경우
		return MissionResponseDto.of(MissionDto.of(mission), missionRecognition, null);
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

	/**
	 * 미션 상태 변경
	 * - 미션의 상태를 변경한다.
	 *
	 * @param missionId 미션 ID
	 * @param statusCode 변경할 상태 코드
	 */
	@Transactional
	public String changeMissionStatus(Member parent, Long missionId, StatusCode statusCode) {

		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));
		Member memChild = memberRepository.findById(mission.getChild().getId())
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MEMBER_NOT_FOUND));

		// 부모와 미션의 가족이 일치하는지 확인
		validateFamily(parent.getFamily().getId(), memChild.getFamily().getId());

		if (statusCode == StatusCode.ACCEPT && mission.getStatus() != StatusCode.ACCEPT) {
			// 미션 상태 변경 (ACCEPT)
			missionSuccess(parent, mission, memChild, statusCode);
			return "미션 성공, 포인트 지급 완료";
		}
		// 미션 decline 구현 필요
		mission.setStatus(statusCode);
		return "미션 실패";
	}

	void missionSuccess(Member parent, Mission mission, Member memChild, StatusCode statusCode) {
		Family family = familyRepository.findFamilyById(parent.getFamily().getId());
		if (family.getFamilyPoint() < mission.getPoint()) {
			throw new CustomValidationException("가족 포인트가 부족합니다.");
		}
		family.addFamilyPoint(-mission.getPoint());
		FamilyPointHistory familyPointHistory = FamilyPointHistory.builder()
			.content(mission.getTitle())
			.member(memChild)
			.family(family)
			.totalPoint(family.getFamilyPoint())
			.payPoint(-mission.getPoint())
			.mission(mission)
			.build();
		familyPointHistoryRepository.save(familyPointHistory);

		Child child = childRepository.findByMember_Id(mission.getChild().getId());
		child.setPoint(child.getPoint() + mission.getPoint());
		childRepository.save(child);

		ChildPointHistory childPointHistory = ChildPointHistory.builder()
			.mission(mission)
			.content(mission.getTitle())
			.totalPoint(child.getPoint())
			.point(mission.getPoint())
			.child(child)
			.build();
		childPointHistoryRepository.save(childPointHistory);
		mission.updateStatus(statusCode, parent);
	}

	/**
	 * 인증 파일 업로드
	 *
	 * @param member    로그인한 사용자
	 * @param missionId 미션 ID
	 * @param content   인증 내용
	 * @param image     인증 이미지
	 * */
	public Map<String, Long> performMission(Member member, Long missionId, String content, MultipartFile image) throws
		IOException {

		// 미션 조회
		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));

		String imageUrl = getImageStoreURL(image); // S3에 저장한 이미지 경로 반환

		// missionRecognition 생성
		MissionRecognition missionRecognition = MissionRecognition.builder()
			.content(content)
			.mission(mission)
			.image(imageUrl)
			.build();
		missionRecognitionRepository.save(missionRecognition); // 저장
		return Map.of("missionRecognitionId", missionRecognition.getId());
	}

	/**
	 * 이미지 S3에 저장 후 URL 반환
	 * @param image 이미지 파일
	 * */
	private String getImageStoreURL(MultipartFile image) throws IOException {
		if (image != null && !image.isEmpty()) {
			// S3 버킷에 이미지 업로드
			UploadedFileResponseDto imageDto = fileUploadService.uploadFile(image);
			return imageDto.getSaveFile(); // S3 저장 경로 반환
		}
		return null;
	}

	/**
	 * 인증 내용 수정
	 * - 인증에 대해 수정한다. (재요청이라는 가정)
	 *
	 * @param member 로그인한 사용자
	 * @param missionId 미션 ID
	 * @param content 인증 내용
	 * */
	public Map<String, Long> updatePerfomMission(Member member, Long missionId, String content,
		MultipartFile image) throws
		IOException {

		Mission mission = missionRepository.findById(missionId)
			.orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));
		MissionRecognition missionRecognition = mission.getMissionRecognition(); // 미션에 해당하는 인증 내용 조회

		// 승인된 미션은 수정 불가능
		if (mission.getStatus().equals(StatusCode.ACCEPT)) {
			throw new CustomErrorException(ErrorCode.MISSION_ACCEPTED_CAN_NOT_UPDATE);
		}

		String imageUrl = getImageStoreURL(image);
		missionRecognition.updateRecognition(imageUrl, content);

		// TODO :: 인증 시, 부모에게 알림 전송
		return null;
	}
}
