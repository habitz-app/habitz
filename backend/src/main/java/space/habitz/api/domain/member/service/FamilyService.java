package space.habitz.api.domain.member.service;

import java.util.List;

import space.habitz.api.domain.member.dto.FamilyChildListResponseDto;
import space.habitz.api.domain.member.dto.FamilyListResponseDto;
import space.habitz.api.domain.member.dto.MemberInviteCodeResponse;

public interface FamilyService {
	MemberInviteCodeResponse getInviteCode();

	List<FamilyListResponseDto> getFamilyList();

	List<FamilyChildListResponseDto> getFamilyChildList();
}
