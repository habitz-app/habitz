package space.habitz.api.domain.mission.dto;

import lombok.Builder;

@Builder
public record MissionApprovalDto(
	String name,
	String comment
) {
	public static MissionApprovalDto of(String name, String comment) {
		return MissionApprovalDto.builder()
			.name(name)
			.comment(comment)
			.build();
	}
}
