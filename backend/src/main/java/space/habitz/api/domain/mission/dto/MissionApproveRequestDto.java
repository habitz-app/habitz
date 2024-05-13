package space.habitz.api.domain.mission.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import space.habitz.api.domain.mission.entity.StatusCode;

@Builder
public record MissionApproveRequestDto(
	Long missionId,
	@NotNull(message = "올바른 상태코드를 입력해주세요.")
	StatusCode status,
	@Size(max = 255, message = "인증 내용은 255자를 넘을 수 없습니다.")
	String comment
) {

}
