package space.habitz.api.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.dto.*;
import space.habitz.api.domain.member.entity.*;
import space.habitz.api.domain.member.exeption.*;
import space.habitz.api.domain.member.repository.*;
import java.util.Optional;

import static space.habitz.api.domain.member.service.JwtTokenProvider.TOKEN_TYPE;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberApiService memberApiService;
	private final MemberRepository memberRepository;
	private final ClientRegistrationRepository clientRegistrationRepository;
	private final SocialInformRepository socialInformRepository;
	private final MemberProfileRepository memberProfileRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;

	@Override
	public MemberLoginResponseDto login(MemberLoginRequestDto dto) throws Exception {
		String provider = dto.getProvider();
		String code = dto.getCode();

		ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(provider);
		OAuthTokenResponse oAuthToken = memberApiService.getOAuthToken(code, clientRegistration);
		OAuthUserInfoResponse userInfo = memberApiService.getUserInfo(oAuthToken, clientRegistration);

		Member member = saveOrUpdate(userInfo);
		JwtTokenDto jwtToken = jwtTokenProvider.generateToken(member);
		RefreshToken refreshToken = jwtTokenProvider.toRefreshToken(member, jwtToken);
		refreshTokenRepository.save(refreshToken);

		return new MemberLoginResponseDto(member, jwtToken);
	}

	private Member saveOrUpdate(OAuthUserInfoResponse userInfo) {
		Optional<Member> bySocialId = memberRepository.findBySocialId(userInfo.getSocialId());

		if (bySocialId.isPresent()) {
			Member member = bySocialId.get();
			MemberProfile updatedProfile = member.getMemberProfile().update(userInfo);
			Member updatedMember = member.update(userInfo);
			memberProfileRepository.save(updatedProfile);
			return memberRepository.saveAndFlush(updatedMember);
		}

		Member member = userInfo.toMemberEntity();
		member.setRole(Role.GUEST);
		SocialInform socialInformEntity = userInfo.toSocialInformEntity();
		MemberProfile memberProfileEntity = userInfo.toMemberProfileEntity();

		member = memberRepository.saveAndFlush(member);
		socialInformEntity.setMember(member);
		memberProfileEntity.setMember(member);

		socialInformRepository.save(socialInformEntity);
		memberProfileRepository.save(memberProfileEntity);
		member.setMemberInform(memberProfileEntity, socialInformEntity);

		return memberRepository.saveAndFlush(member);
	}

	@Override
	public JwtTokenDto refreshToken(String refreshToken) {
		if (refreshToken == null || !refreshToken.startsWith(TOKEN_TYPE))
			throw new MemberUnAuthorizedException("유효하지 않은 검증 타입 입니다.");

		refreshToken = refreshToken.replace(TOKEN_TYPE + " ", "");

		jwtTokenProvider.validateRefreshToken(refreshToken);

		Long userId = jwtTokenProvider.extractUserId(refreshToken);
		Member member = memberRepository.findByUserId(userId)
			.orElseThrow(() ->new MemberNotFoundException(userId));

		return jwtTokenProvider.generateToken(member);
	}
}
