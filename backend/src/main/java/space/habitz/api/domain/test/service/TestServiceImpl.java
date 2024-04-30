package space.habitz.api.domain.test.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberLoginResponseDto;
import space.habitz.api.domain.member.entity.*;
import space.habitz.api.domain.member.exeption.MemberNotFoundException;
import space.habitz.api.domain.member.repository.MemberProfileRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.member.repository.RefreshTokenRepository;
import space.habitz.api.domain.member.repository.SocialInformRepository;
import space.habitz.api.domain.member.service.JwtTokenProvider;
import space.habitz.api.domain.test.dto.DummyMemberLoginRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterResponseDto;
import space.habitz.api.global.util.RandomUtils;


@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {
	private final MemberRepository memberRepository;
	private final SocialInformRepository socialInformRepository;
	private final MemberProfileRepository memberProfileRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;

	@Override
	public DummyMemberRegisterResponseDto register(DummyMemberRegisterRequestDto requestDto) {
		Member member = Member.builder()
			.name(requestDto.getName())
			.nickname(requestDto.getNickName())
			.image(requestDto.getImage())
			.uuid(RandomUtils.generateRandomCode(6))
			.role(Role.findEnum(requestDto.getRole()))
			.build();

		member = memberRepository.saveAndFlush(member);

		MemberProfile memberProfile = MemberProfile.builder()
			.gender(requestDto.getGender())
			.email(requestDto.getEmail())
			.birthDate(requestDto.getBirthDate())
			.build();

		SocialInform socialInform = SocialInform.builder()
			.socialId(RandomUtils.generateRandomCode(6))
			.provider("kakao")
			.build();

		socialInform.setMember(member);
		memberProfile.setMember(member);

		socialInformRepository.save(socialInform);
		memberProfileRepository.save(memberProfile);
		member.setMemberInform(memberProfile, socialInform);

		member = memberRepository.saveAndFlush(member);

		return new DummyMemberRegisterResponseDto(member);
	}

	@Override
	public MemberLoginResponseDto getAccessToken(DummyMemberLoginRequestDto requestDto) {
		Long memberId = requestDto.getMemberId();

		Member member = memberRepository.findByUserId(memberId)
			.orElseThrow(() -> new MemberNotFoundException(memberId));

		JwtTokenDto jwtToken = jwtTokenProvider.generateToken(member);
		RefreshToken refreshToken = jwtTokenProvider.toRefreshToken(member, jwtToken);
		refreshTokenRepository.save(refreshToken);

		return new MemberLoginResponseDto(member, jwtToken);
	}
}
