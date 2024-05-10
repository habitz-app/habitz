package space.habitz.api.domain.mission.dto;

import lombok.Builder;
import space.habitz.api.domain.schedule.dto.ScheduleIdDto;

@Builder
public record MissionResponseDto(
	ScheduleIdDto schedule,
	MissionDto mission,
	MissionRecognitionDto recognition,
	MissionApprovalDto approval
) {
	public static MissionResponseDto of(Long scheduleId, MissionDto mission, MissionRecognitionDto recognition,
		MissionApprovalDto approval) {
		return MissionResponseDto.builder()
			.schedule(ScheduleIdDto.of(scheduleId))
			.mission(mission)
			.recognition(recognition)
			.approval(approval)
			.build();
	}
}
