package space.habitz.api.domain.schedule.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.domain.schedule.repository.ScheduleRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleService {

	private final ScheduleRepository scheduleRepository;

	public void createSchedule(ScheduleRequestDto scheduleRequestDto) {

		Schedule schedule = scheduleRequestDto.toEntity();
		scheduleRepository.save(schedule);
	}
}
