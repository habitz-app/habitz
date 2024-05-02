package space.habitz.api.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.dto.FamilyListResponseDto;
import space.habitz.api.domain.member.dto.MemberInviteCodeResponse;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.utils.AuthUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FamilyServiceImpl implements FamilyService {
	@Override
	public MemberInviteCodeResponse getInviteCode() {
		Member member = AuthUtils.getAuthenticatedMember();
		Family family = member.getFamily();
		return new MemberInviteCodeResponse(family.getId());
	}
}
