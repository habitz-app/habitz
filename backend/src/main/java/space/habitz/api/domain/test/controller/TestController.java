package space.habitz.api.domain.test.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.test.dto.DummyFamilyMakeRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberLoginRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterResponseDto;
import space.habitz.api.domain.test.service.TestService;
import space.habitz.api.global.response.ResponseData;

import java.util.List;


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

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody DummyMemberLoginRequestDto request) throws Exception {
		MemberLoginResultDto accessToken = testService.getAccessToken(request);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("로그인 성공", accessToken));
	}

	@PostMapping("/makeFamily/{memberId}/{targetId}")
	public ResponseEntity<?> makeFamily(@PathVariable("memberId") Long memberId, @PathVariable("targetId") Long targetId) {
		testService.makeFamily(memberId, targetId);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("가족 등록 성공", null));
	}

	@PostMapping("/makeFamily/")
	public ResponseEntity<?> makeFamily(@RequestBody DummyFamilyMakeRequestDto familyMakeRequestDto) {
		List<MemberLoginResultDto> result = testService.makeFamily(familyMakeRequestDto);
		return ResponseEntity.status(HttpStatus.OK).body(ResponseData.success("가족 등록 성공", result));
	}

}
