package space.habitz.api.domain.mission.dto;

import lombok.Builder;
import space.habitz.api.global.type.StatusCode;

@Builder
public record MissionApproveRequestDto(
	Long missionId,
	StatusCode status,
	String comment
) {

}
