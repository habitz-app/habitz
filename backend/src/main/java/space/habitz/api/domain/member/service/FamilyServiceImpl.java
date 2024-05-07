package space.habitz.api.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.dto.FamilyListResponseDto;
import space.habitz.api.domain.member.dto.MemberInviteCodeResponse;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.member.utils.AuthUtils;

import java.util.List;

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
	public List<FamilyListResponseDto> getChildList() {
		Member member = AuthUtils.getAuthenticatedMember();
		String familyId = member.getFamily().getId();

		return familyRepository.findByFamilyIdOnlyChildMember(familyId, true)
			.stream()
			.map(FamilyListResponseDto::convertToDto)
			.toList();
	}


}
