package space.habitz.api.domain.member.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.FamilyListResponseDto;
import space.habitz.api.domain.member.dto.MemberInviteCodeResponse;
import space.habitz.api.domain.member.service.FamilyService;
import space.habitz.api.global.response.ApiResponseData;

@RestController
@RequestMapping("/api/v1/family")
@RequiredArgsConstructor
public class FamilyController {
	private final FamilyService familyService;

	@GetMapping("/inviteCode")
	public ResponseEntity<?> inviteCode() {
		MemberInviteCodeResponse inviteCode = familyService.getInviteCode();
		return ApiResponseData.success(inviteCode);
	}

	@PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
	@GetMapping("/memberList")
	public ResponseEntity<?> memberList() {
		List<FamilyListResponseDto> familyList = familyService.getFamilyList();
		return ApiResponseData.success(familyList);
	}

	@PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
	@GetMapping("/childList")
	public ResponseEntity<?> childList() {
		List<FamilyListResponseDto> familyList = familyService.getChildList();
		return ApiResponseData.success(familyList);
	}
}



