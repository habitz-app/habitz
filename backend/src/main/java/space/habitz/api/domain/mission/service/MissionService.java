package space.habitz.api.domain.mission.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.mission.dto.MissionDto;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.mission.repository.MissionRepository;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleCustomRepositoryImpl;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;
import space.habitz.api.global.type.StatusCode;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MissionService {

	private final MissionRepository missionRepository;
	private final ScheduleCustomRepositoryImpl scheduleCustomRepository;

	/**
	 * 미션 상세 조회
	 *
	 * @param missionId 미션 ID
	 */
	@Transactional
	public MissionDto getMissionDetail(Long missionId) {
		Mission mission = missionRepository.findById(missionId).orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));
		return MissionDto.of(mission);
	}

	/**
	 * 미션 삭제
	 * - ACCEPT 일 경우 삭제가 불가능하다.
	 * - Mission은 Soft Delete로 처리한다. // Mission Entity에서 SQLDelete 어노테이션 Overriding 사용
	 *
	 * @param missionId 미션 ID
	 */
	public Map<String, Long> deleteMission(Member member, Long missionId) {

		Mission mission = missionRepository.findById(missionId).orElseThrow(() -> new CustomErrorException(ErrorCode.MISSION_NOT_FOUND));

		if (mission.getStatus().equals(StatusCode.ACCEPT)) {
			throw new CustomErrorException(ErrorCode.MISSION_ACCEPTED_CAN_NOT_DELETE);
		}

		missionRepository.delete(mission);
		return Map.of("missionId", missionId);
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

		List<Schedule> scheduleList = scheduleCustomRepository.findSchedulesByDate(today);
		log.info("Make mission list size: {}", scheduleList.size());

		// From Schedule To Daily Mission
		List<Mission> missionList = scheduleList.stream()
			.map(schedule -> Mission.builder()
				.schedule(schedule)
				.child(schedule.getChild())
				.parent(schedule.getParent())
				.content(schedule.getContent())
				.title(schedule.getTitle())
				.emoji(schedule.getEmoji())
				.point(schedule.getPoint())
				.status(StatusCode.EMPTY)
				.isDeleted(false)
				.repeatable(schedule.getRepeatable())
				.build())
			.collect(Collectors.toList());

		missionRepository.saveAll(missionList);
		log.info("Scheduled generateDailyMissions finished");
	}
}
