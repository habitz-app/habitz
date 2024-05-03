package space.habitz.api.domain.mission.dto;

import lombok.Builder;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.global.type.StatusCode;

import java.time.LocalDateTime;

@Builder
public record MissionDto(
	Long missionId,
	String title,
	String content,
	String emoji,
	StatusCode status,
	int point,
	boolean repeat,
	LocalDateTime createdAt,
	String createdBy

) {

	public static MissionDto of(Mission mission) {
		return MissionDto.builder()
			.missionId(mission.getId())
			.title(mission.getTitle())
			.content(mission.getContent())
			.emoji(mission.getEmoji())
			.status(mission.getStatus())
			.point(mission.getPoint())
			.repeat(mission.isRepeatable())
			.createdAt(mission.getCreatedAt())
			.createdBy(mission.getParent().getName())
			.build();
	}
}
