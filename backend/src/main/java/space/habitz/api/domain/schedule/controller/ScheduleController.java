package space.habitz.api.domain.schedule.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.service.ScheduleService;
import space.habitz.api.global.response.ResponseData;

@Tag(name = "Schedule", description = "일정 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(
            summary = "일정 생성",
            description = "일정을 생성합니다."
    )
    @PostMapping
    public ResponseData<?> createSchedule(@AuthenticationPrincipal Member member, @RequestBody ScheduleRequestDto scheduleRequestDto) {
        return ResponseData.success(scheduleService.createSchedule(member, scheduleRequestDto));
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

	@Operation(
		summary = "일정 삭제",
		description = "일정을 삭제합니다."
	)
	@DeleteMapping("/{scheduleId}")
	public ResponseData<String> deleteSchedule(@AuthenticationPrincipal Member member, @PathVariable Long scheduleId) {
		return ResponseData.success(scheduleService.deleteSchedule(member, scheduleId));
	}

}
