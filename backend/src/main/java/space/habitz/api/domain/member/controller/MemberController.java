package space.habitz.api.domain.member.controller;

import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberFindResponseDto;
import space.habitz.api.domain.member.dto.MemberLoginRequestDto;
import space.habitz.api.domain.member.dto.MemberLoginResponseDto;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.member.dto.MemberMypageResponseDto;
import space.habitz.api.domain.member.dto.MemberRegisterRequestDto;
import space.habitz.api.domain.member.dto.MemberUpdateRequestDto;
import space.habitz.api.domain.member.dto.RefreshTokenRequestDto;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.service.MemberService;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto request,
		HttpServletResponse httpServletResponse) throws Exception {
		MemberLoginResultDto login = memberService.login(request);

		ResponseCookie accessToken = getCookie("accessToken", login.getJwtTokenDto().getAccessToken(), 1);
		ResponseCookie refreshToken = getCookie("refreshToken", login.getJwtTokenDto().getRefreshToken(), 30);
		ResponseCookie tokenType = getCookie("tokenType", login.getJwtTokenDto().getTokenType(), 1);
		ResponseCookie role = getCookie("role", login.getRole().toString(), 1);
		MemberLoginResponseDto result = new MemberLoginResponseDto(login);

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, refreshToken.toString())
			.header(HttpHeaders.SET_COOKIE, accessToken.toString())
			.header(HttpHeaders.SET_COOKIE, tokenType.toString())
			.header(HttpHeaders.SET_COOKIE, role.toString())
			.body(ResponseData.success("회원 정보 로드 성공", result));
	}

	private static ResponseCookie getCookie(String key, String value, int days) {
		return ResponseCookie.from(key, value)
			.httpOnly(true)
			.secure(true)
			.sameSite("None")
			.path("/")
			.maxAge(Duration.ofDays(days))
			.build();
	}

	@PostMapping("/refreshToken")
	public ResponseEntity<?> login(@RequestBody RefreshTokenRequestDto requestDto) throws Exception {
		JwtTokenDto login = memberService.refreshToken(requestDto.getRefreshToken());
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("리프레시 토큰 발급 완료", login));
	}

	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody MemberRegisterRequestDto requestDto) {
		memberService.register(requestDto);
		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, ResponseCookie.from("role", requestDto.getMemberRole())
				.httpOnly(true)
				.secure(true)
				.sameSite("None")
				.maxAge(Duration.ofDays(1))
				.build()
				.toString())
			.body(ResponseData.success("회원 정보 로드 성공", null));
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
