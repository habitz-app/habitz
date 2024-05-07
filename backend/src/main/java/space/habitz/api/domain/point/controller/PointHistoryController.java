package space.habitz.api.domain.point.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.point.dto.PointHistory;
import space.habitz.api.domain.point.service.ChildPointHistoryService;
import space.habitz.api.global.exception.CustomNotFoundException;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/point")
public class PointHistoryController {

	private final ChildPointHistoryService childPointHistoryService;

	@GetMapping("/history")
	public ResponseData<List<PointHistory>> getPointHistory(@AuthenticationPrincipal Member member) {
		if (member.getRole() == Role.PARENT) {
			// family 포인트 내역 조회 예정, 현재는 자녀 포인트 내역만 조회 가능
			return null;
		}
		if (member.getRole() == Role.CHILD) {
			return new ResponseData<>("success", "포인트 내역 조회 성공", childPointHistoryService.getPointHistory(member));
		}

		throw new CustomNotFoundException("부모, 자녀 계정이 아닙니다.");
	}

}
