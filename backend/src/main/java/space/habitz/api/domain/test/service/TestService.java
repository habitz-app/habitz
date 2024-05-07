package space.habitz.api.domain.test.service;

import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.test.dto.DummyMemberLoginRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterResponseDto;

public interface TestService {
	DummyMemberRegisterResponseDto register(DummyMemberRegisterRequestDto requestDto);

	MemberLoginResultDto getAccessToken(DummyMemberLoginRequestDto requestDto);

	void makeFamily(Long memberId, Long targetId);
}
