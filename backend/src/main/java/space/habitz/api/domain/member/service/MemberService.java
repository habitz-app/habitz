package space.habitz.api.domain.member.service;

import space.habitz.api.domain.member.dto.*;
import space.habitz.api.domain.member.entity.*;

public interface MemberService {
	MemberLoginResponseDto login(MemberLoginRequestDto requestDto) throws Exception;

	JwtTokenDto refreshToken(String refreshToken);

	MemberFindResponseDto memberType(Member member);

	void register(MemberRegisterRequestDto requestDto);

	MemberMypageResponseDto getMemberInfo();
}
