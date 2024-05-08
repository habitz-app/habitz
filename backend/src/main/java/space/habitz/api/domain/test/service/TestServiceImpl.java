package space.habitz.api.domain.test.service;

import static space.habitz.api.global.util.RandomUtils.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.dto.MemberLoginResultDto;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.MemberProfile;
import space.habitz.api.domain.member.entity.Parent;
import space.habitz.api.domain.member.entity.RefreshToken;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.entity.SocialInform;
import space.habitz.api.domain.member.exeption.MemberNotFoundException;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.member.repository.MemberProfileRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.member.repository.ParentRepository;
import space.habitz.api.domain.member.repository.RefreshTokenRepository;
import space.habitz.api.domain.member.repository.SocialInformRepository;
import space.habitz.api.domain.member.service.JwtTokenProvider;
import space.habitz.api.domain.test.dto.DummyFamilyMakeRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberLoginRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterRequestDto;
import space.habitz.api.domain.test.dto.DummyMemberRegisterResponseDto;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.util.RandomUtils;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {
	private final MemberRepository memberRepository;
	private final SocialInformRepository socialInformRepository;
	private final MemberProfileRepository memberProfileRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;
	private final FamilyRepository familyRepository;
	private final ChildRepository childRepository;
	private final ParentRepository parentRepository;

	@Override
	public DummyMemberRegisterResponseDto register(DummyMemberRegisterRequestDto requestDto) {
		Member member = Member.builder()
			.name(requestDto.getName())
			.nickname(requestDto.getNickName())
			.image(requestDto.getImage())
			.uuid(generateRandomCode(6))
			.role(Role.findEnum(requestDto.getRole()))
			.build();

		member = memberRepository.saveAndFlush(member);

		MemberProfile memberProfile = MemberProfile.builder()
			.gender(requestDto.getGender())
			.email(requestDto.getEmail())
			.birthDate(requestDto.getBirthDate())
			.build();

		SocialInform socialInform = SocialInform.builder()
			.socialId(generateRandomCode(6))
			.provider("kakao")
			.build();

		socialInform.setMember(member);
		memberProfile.setMember(member);

		socialInformRepository.save(socialInform);
		memberProfileRepository.save(memberProfile);
		member.setMemberInform(memberProfile, socialInform);

		member = memberRepository.saveAndFlush(member);

		String familyId = requestDto.getFamilyId();

		Family family = familyRepository.findById(familyId)
			.orElseGet(
				() -> {
					String randomCode = RandomUtils.generateRandomCode(6);
					Family generatedFamily = new Family(randomCode, 0);
					return familyRepository.saveAndFlush(generatedFamily);
				}
			);

		String memberRole = requestDto.getRole().toUpperCase();
		Role role = Role.findEnum(memberRole);

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

		return new DummyMemberRegisterResponseDto(member);
	}

	@Override
	public MemberLoginResultDto getAccessToken(DummyMemberLoginRequestDto requestDto) {
		Long memberId = requestDto.getMemberId();

		Member member = memberRepository.findByUserId(memberId)
			.orElseThrow(() -> new MemberNotFoundException(memberId));

		JwtTokenDto jwtToken = jwtTokenProvider.generateToken(member);
		RefreshToken refreshToken = jwtTokenProvider.toRefreshToken(member, jwtToken);
		refreshTokenRepository.save(refreshToken);

		return new MemberLoginResultDto(member, jwtToken);
	}

	@Override
	public void makeFamily(Long memberId, Long targetId) {

		Member member = memberRepository.findByUserId(memberId)
			.orElseThrow(() -> new MemberNotFoundException(memberId));
		Member target = memberRepository.findByUserId(targetId)
			.orElseThrow(() -> new MemberNotFoundException(targetId));

		if (member.getFamily() == null) {
			String familyId = generateRandomCode(6);
			Family family = Family.builder()
				.id(familyId)
				.build();
			familyRepository.save(family);
			member.setFamily(family);
			target.setFamily(family);
			memberRepository.save(member);
			memberRepository.save(target);
		} else {
			Family family = member.getFamily();
			target.setFamily(family);
			memberRepository.save(target);
		}
	}

	@Override
	public List<MemberLoginResultDto> makeFamily(DummyFamilyMakeRequestDto requestDto) {
		Member member = memberRepository.findByUserId(requestDto.getMemberId())
			.orElseThrow(() -> new MemberNotFoundException(requestDto.getMemberId()));

		if (!member.getRole().equals(Role.PARENT))
			throw new CustomErrorException("부모 코스프레는 허용하지 않습니다.");

		return IntStream.range(0, Math.toIntExact(requestDto.getNumber()))
			.mapToObj(i -> {
				DummyMemberRegisterRequestDto dto = DummyMemberRegisterRequestDto.builder()
					.familyId(member.getFamily().getId())
					.nickName("나의 배포물" + i)
					.birthDate(LocalDate.now())
					.role(Role.CHILD.getRoleName().toUpperCase())
					.name("자식" + i)
					.image("")
					.gender(new Random().nextInt(2) > 0 ? "MALE" : "FEMALE")
					.email("deploy" + i + "@kakao.com")
					.build();
				return this.register(dto);
			}).map(
				dummyMemberRegisterResponseDto -> {
					DummyMemberLoginRequestDto dummyMemberLoginRequestDto = new DummyMemberLoginRequestDto(
						dummyMemberRegisterResponseDto.getUserId());
					return this.getAccessToken(dummyMemberLoginRequestDto);
				}
			).toList();
	}
}

