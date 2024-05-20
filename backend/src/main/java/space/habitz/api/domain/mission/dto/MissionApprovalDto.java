package space.habitz.api.domain.mission.dto;

import lombok.Builder;
import space.habitz.api.domain.member.dto.MemberProfileDto;
import space.habitz.api.domain.member.entity.Member;

@Builder
public record MissionApprovalDto(
	MemberProfileDto approver,
	String comment
) {
	public static MissionApprovalDto of(Member parent, String comment) {
		if (parent == null) {
			return null;
		}
		return MissionApprovalDto.builder()
			.approver(MemberProfileDto.of(parent))
			.comment(comment)
			.build();
	}
}
