package space.habitz.api.domain.member.service;

import static space.habitz.api.domain.member.service.JwtTokenProvider.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Service;

import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberFindResponseDto;
import space.habitz.api.domain.member.dto.MemberLoginRequestDto;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.member.dto.MemberMypageResponseDto;
import space.habitz.api.domain.member.dto.MemberRegisterRequestDto;
import space.habitz.api.domain.member.dto.MemberUpdateRequestDto;
import space.habitz.api.domain.member.dto.OAuthTokenResponse;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.MemberProfile;
import space.habitz.api.domain.member.entity.Parent;
import space.habitz.api.domain.member.entity.RefreshToken;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.entity.SocialInform;
import space.habitz.api.domain.member.exeption.MemberAlreadyRegistedException;
import space.habitz.api.domain.member.exeption.MemberBadRequestException;
import space.habitz.api.domain.member.exeption.MemberNotFoundException;
import space.habitz.api.domain.member.exeption.MemberUnAuthorizedException;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.member.repository.MemberProfileRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.member.repository.ParentRepository;
import space.habitz.api.domain.member.repository.RefreshTokenRepository;
import space.habitz.api.domain.member.repository.SocialInformRepository;
import space.habitz.api.domain.member.utils.AuthUtils;
import space.habitz.api.global.util.RandomUtils;

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
	private final FamilyRepository familyRepository;
	private final ChildRepository childRepository;
	private final ParentRepository parentRepository;

	@Override
	public MemberLoginResultDto login(MemberLoginRequestDto dto) throws Exception {
		String provider = dto.getProvider();
		String code = dto.getCode();

		ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId(provider);
		OAuthTokenResponse oAuthToken = memberApiService.getOAuthToken(code, clientRegistration);
		OAuthUserInfoResponse userInfo = memberApiService.getUserInfo(oAuthToken, clientRegistration);

		Member member = saveOrUpdate(userInfo);
		JwtTokenDto jwtToken = jwtTokenProvider.generateToken(member);
		RefreshToken refreshToken = jwtTokenProvider.toRefreshToken(member, jwtToken);
		refreshTokenRepository.save(refreshToken);

		return new MemberLoginResultDto(member, jwtToken);
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
			.orElseThrow(() -> new MemberNotFoundException(userId));

		return jwtTokenProvider.generateToken(member);
	}

	@Override
	public MemberFindResponseDto memberType(Member member) {
		String result = member.getRole().getRoleName();
		return new MemberFindResponseDto(result);
	}

	@Override
	public void register(MemberRegisterRequestDto requestDto) {
		String familyId = requestDto.getFamilyId();
		Member member = AuthUtils.getAuthenticatedMember();
		String nickname = requestDto.getNickname();
		String memberRole = requestDto.getMemberRole().toUpperCase();
		Role role = Role.findEnum(memberRole);

		familyId = StringUtils.isBlank(familyId) ? "" : familyId;

		if (!member.getRole().equals(Role.GUEST))
			throw new MemberAlreadyRegistedException("이미 등록된 회원입니다.");

		Family family = familyRepository.findById(familyId)
			.orElseGet(
				() -> {
					if (role.equals(Role.CHILD))
						throw new MemberBadRequestException("아이는 가족을 생성할 수 없습니다.");

					String randomCode = RandomUtils.generateRandomCode(6);
					Family generatedFamily = new Family(randomCode, 0);
					return familyRepository.saveAndFlush(generatedFamily);
				}
			);


		if (!StringUtils.isBlank(nickname))
			member.setNickname(nickname);

		member.setRole(role);
		member.setFamily(family);
		member = memberRepository.save(member);

		if (role.getRoleName().equals("PARENT")) {
			Parent parent = new Parent(member, 0);
			parentRepository.save(parent);
		} else if (role.getRoleName().equals("CHILD")) {
			Child child = new Child(member, 0);
			childRepository.save(child);
		}
	}

	@Override
	public MemberMypageResponseDto getMemberInfo() {
		Member authenticatedMember = AuthUtils.getAuthenticatedMember();
		return new MemberMypageResponseDto(authenticatedMember);
	}

	@Override
	public void logout() throws Exception {
		Member authenticatedMember = AuthUtils.getAuthenticatedMember();
		refreshTokenRepository.deleteAllById(List.of(authenticatedMember.getId()));
	}

	@Override
	public void exit() {
		Member authenticatedMember = AuthUtils.getAuthenticatedMember();
		MemberProfile memberProfile = authenticatedMember.getMemberProfile();
		memberProfile.setDeletedAt(LocalDateTime.now());
		memberProfileRepository.save(memberProfile);
	}

	@Override
	public void updateMemberInfo(MemberUpdateRequestDto requestDto) {
		Member authenticatedMember = AuthUtils.getAuthenticatedMember();
		authenticatedMember.setNickname(requestDto.getNickName());
		authenticatedMember.setImage(requestDto.getProfileImage());

		memberRepository.save(authenticatedMember);
	}
}
