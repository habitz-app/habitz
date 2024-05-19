package space.habitz.api.domain.member.controller;

import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.JwtResponseDto;
import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberFindResponseDto;
import space.habitz.api.domain.member.dto.MemberLoginRequestDto;
import space.habitz.api.domain.member.dto.MemberLoginResponseDto;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.member.dto.MemberMypageResponseDto;
import space.habitz.api.domain.member.dto.MemberRegisterRequestDto;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.service.MemberService;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginRequestDto request) throws Exception {
		MemberLoginResultDto login = memberService.login(request);

		ResponseCookie accessToken = getCookie("accessToken", login.getJwtTokenDto().getAccessToken(), 1);
		ResponseCookie refreshToken = getCookie("refreshToken", login.getJwtTokenDto().getRefreshToken(), 7);
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

	@PostMapping("/reissue")
	public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken") String refreshToken) throws Exception {
		JwtTokenDto refreshedToken = memberService.refreshToken(refreshToken);

		ResponseCookie regeneratedAccessToken = getCookie("accessToken", refreshedToken.getAccessToken(), 1);
		ResponseCookie regeneratedRefreshToken = getCookie("refreshToken", refreshedToken.getRefreshToken(), 7);
		ResponseCookie tokenType = getCookie("tokenType", refreshedToken.getTokenType(), 1);

		JwtResponseDto response = JwtResponseDto.builder()
			.accessToken(refreshedToken.getAccessToken())
			.tokenType(refreshedToken.getTokenType())
			.accessTokenExpiredIn(refreshedToken.getRefreshTokenExpiredIn())
			.build();

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, regeneratedRefreshToken.toString())
			.header(HttpHeaders.SET_COOKIE, regeneratedAccessToken.toString())
			.header(HttpHeaders.SET_COOKIE, tokenType.toString())
			.body(ResponseData.success("토큰 재발급 완료", response));
	}

	@PostMapping("/join")
	public ResponseEntity<?> join(@RequestBody MemberRegisterRequestDto requestDto,
		@AuthenticationPrincipal Member member) {
		memberService.register(requestDto);
		MemberFindResponseDto result = memberService.memberType(member);

		ResponseCookie role = getCookie("role", result.getMemberType(), 1);

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, role.toString())
			.body(ResponseData.success("회원 정보 로드 성공", null));
	}

	@GetMapping("/type")
	public ResponseEntity<?> memberType(@AuthenticationPrincipal Member member) {
		MemberFindResponseDto result = memberService.memberType(member);
		ResponseCookie role = getCookie("role", result.getMemberType(), 1);

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, role.toString())
			.body(ResponseData.success("회원 여부 조회 성공", result));
	}

	@GetMapping("")
	public ResponseEntity<?> memberInfo() {
		MemberMypageResponseDto result = memberService.getMemberInfo();
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 정보 조회 성공", result));
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout(@CookieValue(value = "refreshToken") String refreshToken,
		@CookieValue(value = "accessToken") String accessToken,
		@CookieValue(value = "role") String role,
		@CookieValue(value = "tokenType") String tokenType
	) throws Exception {
		memberService.logout();

		ResponseCookie regeneratedAccessToken = getCookie("accessToken", accessToken, 0);
		ResponseCookie regeneratedRefreshToken = getCookie("refreshToken", refreshToken, 0);
		ResponseCookie regeneratedTokenType = getCookie("tokenType", tokenType, 0);
		ResponseCookie regeneratedRole = getCookie("role", role, 0);

		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.SET_COOKIE, regeneratedTokenType.toString())
			.header(HttpHeaders.SET_COOKIE, regeneratedAccessToken.toString())
			.header(HttpHeaders.SET_COOKIE, regeneratedRefreshToken.toString())
			.header(HttpHeaders.SET_COOKIE, regeneratedRole.toString())
			.body(ResponseData.success("회원 로그아웃 성공"));
	}

	@DeleteMapping("/exit")
	public ResponseEntity<?> exit() throws Exception {
		memberService.exit();
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 탈퇴 성공"));
	}
	//
	// @PutMapping("/edit")
	// public ResponseEntity<?> edit(@RequestBody MemberUpdateRequestDto dto) throws Exception {
	// 	memberService.updateMemberInfo(dto);
	// 	return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("회원 수정 성공"));
	// }

	@PatchMapping(value = "/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseData<?> editUserData(@AuthenticationPrincipal Member member,
		@RequestPart(name = "nickname", required = false) String nickName,
		@RequestPart(name = "image", required = false) MultipartFile image) throws Exception {

		memberService.updateUserInfo(member, nickName, image);

		return ResponseData.success("회원 정보 수정 성공");
	}
}
