package space.habitz.api.domain.member.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import space.habitz.api.domain.member.dto.*;
import space.habitz.api.domain.member.service.FamilyService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/family")
@RequiredArgsConstructor
public class FamilyController {
	private final FamilyService familyService;

	@GetMapping("/inviteCode")
	public ResponseEntity<?> inviteCode(){
		MemberInviteCodeResponse inviteCode = familyService.getInviteCode();
		return ResponseEntity.status(HttpStatus.OK).body(inviteCode);
	}

	@PreAuthorize("hasAnyRole('PARENT')")
	@GetMapping("/memberList")
	public ResponseEntity<?> memberList(){
		List<FamilyListResponseDto> familyList = familyService.getFamilyList();
		return ResponseEntity.status(HttpStatus.OK).body(familyList);
	}
}



