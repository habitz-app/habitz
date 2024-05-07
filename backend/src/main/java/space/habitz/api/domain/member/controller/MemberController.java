package space.habitz.api.domain.member.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import space.habitz.api.domain.member.dto.*;
import space.habitz.api.domain.member.entity.*;
import space.habitz.api.domain.member.service.MemberService;
import space.habitz.api.global.response.ResponseData;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.time.Duration;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto request, HttpServletResponse httpServletResponse) throws Exception {
		MemberLoginResultDto login = memberService.login(request);

		ResponseCookie refreshToken = ResponseCookie.from("refreshToken", login.getJwtTokenDto().getRefreshToken())
			.httpOnly(true)
			.secure(true)
			.maxAge(Duration.ofDays(7))
			.build();

		MemberLoginResponseDto result = new MemberLoginResponseDto(login);

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, refreshToken.toString())
			.body(ResponseData.success("회원 정보 로드 성공", result));
	}

	@PostMapping("/refreshToken")
	public ResponseEntity<?> login(@RequestBody RefreshTokenRequestDto requestDto) throws Exception {
		JwtTokenDto login = memberService.refreshToken(requestDto.getRefreshToken());
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("리프레시 토큰 발급 완료", login));
	}

	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody MemberRegisterRequestDto requestDto) {
		memberService.register(requestDto);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 정보 로드 성공", null));
	}

	@GetMapping("/type")
	public ResponseEntity<?> memberType(@AuthenticationPrincipal Member member) {
		MemberFindResponseDto result = memberService.memberType(member);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 여부 조회 성공", result));
	}

	@GetMapping("")
	public ResponseEntity<?> memberInfo() {
		MemberMypageResponseDto result = memberService.getMemberInfo();
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 정보 조회 성공", result));
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout() throws Exception {
		memberService.logout();
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 로그아웃 성공"));
	}

	@DeleteMapping("/exit")
	public ResponseEntity<?> exit() throws Exception {
		memberService.exit();
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 탈퇴 성공"));
	}

	@PutMapping("/edit")
	public ResponseEntity<?> edit(@RequestBody MemberUpdateRequestDto dto) throws Exception {
		memberService.updateMemberInfo(dto);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 수정 성공"));
	}

}
