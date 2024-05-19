package space.habitz.api.domain.member.service;

import org.springframework.web.multipart.MultipartFile;

import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberFindResponseDto;
import space.habitz.api.domain.member.dto.MemberLoginRequestDto;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.member.dto.MemberMypageResponseDto;
import space.habitz.api.domain.member.dto.MemberRegisterRequestDto;
import space.habitz.api.domain.member.dto.MemberUpdateRequestDto;
import space.habitz.api.domain.member.entity.Member;

public interface MemberService {
	MemberLoginResultDto login(MemberLoginRequestDto requestDto) throws Exception;

	JwtTokenDto refreshToken(String refreshToken);

	MemberFindResponseDto memberType(Member member);

	void register(MemberRegisterRequestDto requestDto);

	MemberMypageResponseDto getMemberInfo();

	void logout() throws Exception;

	void exit();

	void updateMemberInfo(MemberUpdateRequestDto requestDto);

	void updateUserInfo(Member member, String newNickname, MultipartFile image) throws Exception;

	void updateUserInfo(Member member, String newNickname) throws Exception;
}
