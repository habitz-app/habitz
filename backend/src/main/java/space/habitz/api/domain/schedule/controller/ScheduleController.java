package space.habitz.api.domain.schedule.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.dto.ScheduleDto;
import space.habitz.api.domain.schedule.dto.ScheduleMissionDto;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;
import space.habitz.api.domain.schedule.dto.UpdateScheduleRequestDto;
import space.habitz.api.domain.schedule.service.ScheduleService;
import space.habitz.api.global.response.ResponseData;

@Tag(name = "Schedule", description = "일정 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/schedule")
@PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
public class ScheduleController {

	private final ScheduleService scheduleService;

	@Operation(
		summary = "일정 생성 (부모 전용)",
		description = "일정을 생성합니다."
	)
	@PreAuthorize("hasAnyRole('PARENT')")
	@PostMapping
	public ResponseData<?> createSchedule(@AuthenticationPrincipal Member member,
		@RequestBody @Valid ScheduleRequestDto scheduleRequestDto) {
		return ResponseData.success(scheduleService.createSchedule(member, scheduleRequestDto));
	}

	@Operation(
		summary = "일정 상세 조회 (공통)",
		description = "일정 상세 정보를 조회합니다."
	)
	@GetMapping("/{scheduleId}")
	public ResponseData<ScheduleDto> getScheduleDetail(@AuthenticationPrincipal Member member,
		@PathVariable("scheduleId") Long scheduleId) {
		ScheduleDto scheduleDto = scheduleService.getScheduleDetail(member, scheduleId);
		return ResponseData.success(scheduleDto);
	}

	@Operation(
		summary = "날짜를 기준으로 일정 리스트 조회 (아이 전용)",
		description = "아이는 날짜를 기준으로 일정 목록을 조회합니다."
	)
	@PreAuthorize("hasAnyRole('PARENT')")
	@GetMapping("/list")
	public ResponseData<List<ScheduleMissionDto>> getScheduleList(
		@AuthenticationPrincipal Member member,
		@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		return ResponseData.success(scheduleService.getScheduleMissionList(member, date));
	}

	@Operation(
		summary = "날짜를 기준으로 아이들에 대한 미션 리스트 조회 (부모 전용)",
		description = "부모는 날짜를 기준으로 아이의 미션 목록을 조회합니다. <br> child 값은 memberUUID 를 사용합니다. <br> child는 nullable 하며, null일 경우 전체 아이들의 목록 / null이 아닐 경우 특정 아이에 대한 목록을 조회합니다."
	)
	@PreAuthorize("hasAnyRole('PARENT')")
	@GetMapping("/children/list")
	public ResponseData<?> getChildrenScheduleMissionList(
		@AuthenticationPrincipal Member member,
		@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
		@RequestParam(name = "child", required = false) String childUUID) {

		if (childUUID == null) {
			return ResponseData.success(scheduleService.getChildrenScheduleMissionList(member, date));
		} else {
			return ResponseData.success(scheduleService.getChildScheduleMissionList(member, date, childUUID));
		}
	}

	@Operation(
		summary = "일정 삭제 (부모 전용)",
		description = "일정을 삭제합니다."
	)
	@PreAuthorize("hasAnyRole('PARENT')")
	@DeleteMapping("/{scheduleId}")
	public ResponseData<String> deleteSchedule(@AuthenticationPrincipal Member member,
		@PathVariable("scheduleId") Long scheduleId) {
		return ResponseData.success(scheduleService.deleteSchedule(member, scheduleId));
	}

	@Operation(
		summary = "일정 수정 (부모 전용)",
		description = "일정을 수정합니다."
	)
	@PreAuthorize("hasAnyRole('PARENT')")
	@PutMapping("/{scheduleId}")
	public ResponseData<ScheduleDto> updateSchedule(@AuthenticationPrincipal Member member,
		@PathVariable("scheduleId") Long scheduleId,
		@RequestBody @Valid UpdateScheduleRequestDto requestDto) {

		return ResponseData.success(scheduleService.updateSchedule(member, scheduleId, requestDto));
	}

}
