package space.habitz.api.domain.schedule.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleRepository;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

	private final ScheduleRepository scheduleRepository;

	public void createSchedule(ScheduleRequestDto scheduleRequestDto) {

		Schedule schedule = scheduleRequestDto.toEntity();
		scheduleRepository.save(schedule);
	}

	/**
	 * 일정 상세 조회
	 *
	 * @param member     로그인한 사용자 정보
	 * @param scheduleId 일정 ID
	 */
	public ScheduleDto getScheduleDetail(Member member, Long scheduleId) {
		Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new CustomErrorException(ErrorCode.SCHEDULE_NOT_FOUND));
		return ScheduleDto.of(schedule);
	}
}
