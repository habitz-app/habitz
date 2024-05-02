package space.habitz.api.domain.member.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import space.habitz.api.domain.member.dto.*;
import space.habitz.api.domain.member.service.FamilyService;

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
}



