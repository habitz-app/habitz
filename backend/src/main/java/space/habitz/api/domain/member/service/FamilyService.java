package space.habitz.api.domain.member.service;

import space.habitz.api.domain.member.dto.FamilyListResponseDto;
import space.habitz.api.domain.member.dto.MemberInviteCodeResponse;

import java.util.List;


public interface FamilyService {
	MemberInviteCodeResponse getInviteCode();

	List<FamilyListResponseDto> getFamilyList();
}
