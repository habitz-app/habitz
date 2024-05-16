package space.habitz.api.domain.member.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.dto.FamilyChildListResponseDto;
import space.habitz.api.domain.member.dto.FamilyListResponseDto;
import space.habitz.api.domain.member.dto.MemberInviteCodeResponse;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.member.utils.AuthUtils;

@Service
@RequiredArgsConstructor
public class FamilyServiceImpl implements FamilyService {
	private final FamilyRepository familyRepository;

	@Override
	public MemberInviteCodeResponse getInviteCode() {
		Member member = AuthUtils.getAuthenticatedMember();
		Family family = member.getFamily();
		return new MemberInviteCodeResponse(family.getId());
	}

	@Override
	public List<FamilyListResponseDto> getFamilyList() {
		Member member = AuthUtils.getAuthenticatedMember();
		String familyId = member.getFamily().getId();

		return familyRepository.findByFamilyId(familyId)
			.stream()
			.map(FamilyListResponseDto::convertToDto)
			.toList();
	}

	@Override
	public List<FamilyChildListResponseDto> getFamilyChildList() {
		Member member = AuthUtils.getAuthenticatedMember();
		String familyId = member.getFamily().getId();

		return familyRepository.findByFamilyIdOnlyChildMember(familyId)
			.stream()
			.map(FamilyChildListResponseDto::convertToDto)
			.toList();
	}

}
