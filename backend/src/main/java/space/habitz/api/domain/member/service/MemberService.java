package space.habitz.api.domain.member.service;

import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberLoginRequestDto;
import space.habitz.api.domain.member.dto.MemberLoginResponseDto;

public interface MemberService {
	MemberLoginResponseDto login(MemberLoginRequestDto requestDto) throws Exception;

	JwtTokenDto refreshToken(String refreshToken);
}
