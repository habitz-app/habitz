package space.habitz.api.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.dto.*;
import space.habitz.api.domain.member.entity.*;
import space.habitz.api.domain.member.repository.MemberProfileRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.member.repository.RefreshTokenRepository;
import space.habitz.api.domain.member.repository.SocialInformRepository;

import java.util.Optional;

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
}
