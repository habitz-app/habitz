package space.habitz.api.domain.mission.dto;

import lombok.Builder;

@Builder
public record MissionResponseDto(
	MissionDto mission,
	MissionRecognitionDto recognition,
	MissionApprovalDto approval
) {
	public static MissionResponseDto of(MissionDto mission, MissionRecognitionDto recognition,
		MissionApprovalDto approval) {
		return MissionResponseDto.builder()
			.mission(mission)
			.recognition(recognition)
			.approval(approval)
			.build();
	}
}
