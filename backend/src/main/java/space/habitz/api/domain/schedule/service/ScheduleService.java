package space.habitz.api.domain.schedule.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleRepository;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
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

		Member child = memberRepository.findByUuid(scheduleRequestDto.childUUID()).orElseThrow(() -> new CustomErrorException(ErrorCode.CHILD_NOT_FOUND));

		validateFamily(member, child);    // 가족 관계 확인

		Schedule schedule = scheduleRequestDto.toEntity(member, child);
		scheduleRepository.save(schedule);
		return Map.of("scheduleId", schedule.getId());
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
	 * @param parent 가족 관계를 확인할 사용자
	 * @param child  가족 관계를 확인할 사용자
	 */
	public boolean validateFamily(Member parent, Member child) {
		if (!parent.getFamily().getId().equals(child.getFamily().getId())) {
			throw new CustomErrorException(ErrorCode.FAMILY_NOT_MATCH);
		}
		return true;
	}

}
