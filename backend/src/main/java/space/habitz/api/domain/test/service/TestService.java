package space.habitz.api.domain.test.service;

import java.util.List;

import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.test.dto.DummyFamilyMakeRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberLoginRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterResponseDto;
import space.habitz.api.domain.test.dto.DummyMemberRoleChangeRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRoleChangeResponseDto;

public interface TestService {
	DummyMemberRegisterResponseDto register(DummyMemberRegisterRequestDto requestDto);

	MemberLoginResultDto getAccessToken(DummyMemberLoginRequestDto requestDto);

	void makeFamily(Long memberId, Long targetId);

	List<MemberLoginResultDto> makeFamily(DummyFamilyMakeRequestDto member);

	DummyMemberRoleChangeResponseDto changeRole(DummyMemberRoleChangeRequestDto requestDto);
}
