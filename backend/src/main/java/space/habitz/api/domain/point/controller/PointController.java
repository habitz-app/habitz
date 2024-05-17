package space.habitz.api.domain.point.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.point.dto.PointAmount;
import space.habitz.api.domain.point.dto.PointHistory;
import space.habitz.api.domain.point.dto.PointRecentHistoryDto;
import space.habitz.api.domain.point.service.ChildPointHistoryService;
import space.habitz.api.domain.point.service.FamilyPointHistoryService;
import space.habitz.api.domain.point.service.PointService;
import space.habitz.api.global.exception.CustomNotFoundException;
import space.habitz.api.global.response.ApiResponseData;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/point")
public class PointController {

	private final ChildPointHistoryService childPointHistoryService;
	private final FamilyPointHistoryService familyPointHistoryService;
	private final PointService pointService;

	@GetMapping("/history")
	public ResponseData<List<PointHistory>> getPointHistory(@AuthenticationPrincipal Member member,
		@RequestParam("start") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
		@RequestParam("end") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
	) {
		if (member.getRole() == Role.PARENT) {
			return new ResponseData<>("success", "포인트 내역 조회 성공",
				familyPointHistoryService.getPointHistory(member, startDate, endDate.plusDays(1)));
		}
		if (member.getRole() == Role.CHILD) {
			return new ResponseData<>("success", "포인트 내역 조회 성공",
				childPointHistoryService.getPointHistory(member, startDate, endDate.plusDays(1)));
		}

		throw new CustomNotFoundException("부모, 자녀 계정이 아닙니다.");
	}

	@GetMapping("/amount")
	public ResponseData<PointAmount> getPointAmount(@AuthenticationPrincipal Member member) {
		return new ResponseData<>("success", "포인트 조회 성공", pointService.getPoint(member));
	}

	@GetMapping("/childPointHistory")
	@PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
	public ResponseEntity<?> getPointHistory(@AuthenticationPrincipal Member member,
		@RequestParam("start") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
		@RequestParam("end") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
		@RequestParam("childUuid") String childUuid
	) {
		return ApiResponseData.success(childPointHistoryService.getMonthlyChildPointHistory(member,
			childUuid, startDate, endDate.plusDays(1)));
	}

	@GetMapping("recent/history/{childUuid}")
	@PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
	public ResponseData<List<PointRecentHistoryDto>> getRecentPointHistory(@AuthenticationPrincipal Member member,
		@PathVariable("childUuid") String childUuid,
		@RequestParam("limit") int limit
	) {
		return new ResponseData<>("success", "최근 포인트 내역 조회 성공",
			childPointHistoryService.getRecentPointHistory(member, childUuid, limit));
	}

}
