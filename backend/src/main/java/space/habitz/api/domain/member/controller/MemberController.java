package space.habitz.api.domain.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.habitz.api.domain.member.dto.MemberLoginRequestDto;
import space.habitz.api.domain.member.dto.MemberLoginResponseDto;
import space.habitz.api.domain.member.service.MemberService;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto request) throws Exception {
		MemberLoginResponseDto login = memberService.login(request);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 정보 로드 성공", login));

	}
}
