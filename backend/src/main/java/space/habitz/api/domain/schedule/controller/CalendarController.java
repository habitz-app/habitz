package space.habitz.api.domain.schedule.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.service.CalendarService;
import space.habitz.api.global.response.ResponseData;

@Tag(name = "Calendar", description = "캘린더 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/calendar")
public class CalendarController {

	private final CalendarService calendarService;

	@Operation(
		summary = "날짜에 존재하는 일정을 조회 (부모 전용)",
		description = "캘린더를 조회합니다."
	)
	@PreAuthorize("hasAnyRole('PARENT')")
	@GetMapping("")
	public ResponseData<?> getCalendar(
		@AuthenticationPrincipal Member member,
		@RequestParam("year") int year,
		@RequestParam("month") int month) {
		return ResponseData.success(calendarService.getCalendar(member, year, month));
	}

}
