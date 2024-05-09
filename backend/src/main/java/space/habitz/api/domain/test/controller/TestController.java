package space.habitz.api.domain.test.controller;

import java.time.Duration;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.test.dto.DummyFamilyMakeRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberLoginRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterResponseDto;
import space.habitz.api.domain.test.service.TestService;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {
	private final TestService testService;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody DummyMemberRegisterRequestDto request) throws Exception {
		DummyMemberRegisterResponseDto register = testService.register(request);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 가입 성공", register));
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

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody DummyMemberLoginRequestDto request) throws Exception {
		MemberLoginResultDto result = testService.getAccessToken(request);
		ResponseCookie accessToken = getCookie("accessToken", result.getJwtTokenDto().getAccessToken(), 1);
		ResponseCookie refreshToken = getCookie("refreshToken", result.getJwtTokenDto().getRefreshToken(), 7);
		ResponseCookie tokenType = getCookie("tokenType", result.getJwtTokenDto().getTokenType(), 1);
		ResponseCookie role = getCookie("role", result.getRole().toString(), 1);

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, refreshToken.toString())
			.header(HttpHeaders.SET_COOKIE, accessToken.toString())
			.header(HttpHeaders.SET_COOKIE, tokenType.toString())
			.header(HttpHeaders.SET_COOKIE, role.toString())
			.body(ResponseData.success("로그인 성공", result));
	}

	@PostMapping("/makeFamily/")
	public ResponseEntity<?> makeFamily(@RequestBody DummyFamilyMakeRequestDto familyMakeRequestDto) {
		List<MemberLoginResultDto> result = testService.makeFamily(familyMakeRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("가족 등록 성공", result));
	}

	@PostMapping("/makeFamily/{memberId}/{targetId}")
	public ResponseEntity<?> makeFamily(@PathVariable("memberId") Long memberId,
		@PathVariable("targetId") Long targetId) {
		testService.makeFamily(memberId, targetId);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("가족 등록 성공", null));
	}

}
