package space.habitz.api.domain.schedule.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.service.ScheduleService;
import space.habitz.api.global.response.ResponseData;

@Tag(name = "Schedule", description = "일정 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {

	private final ScheduleService scheduleService;

	@PostMapping
	public ResponseData<Integer> createSchedule(@RequestHeader String auth) {
		return ResponseData.success(1);
	}


	@Operation(
		summary = "일정 상세 조회",
		description = "일정 상세 정보를 조회합니다."
	)
	@GetMapping("/{scheduleId}")
	public ResponseData<ScheduleDto> getScheduleDetail(@AuthenticationPrincipal Member member, @PathVariable Long scheduleId) {
		ScheduleDto scheduleDto = scheduleService.getScheduleDetail(member, scheduleId);
		return ResponseData.success(scheduleDto);
	}

}
