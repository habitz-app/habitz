package space.habitz.api.domain.mission.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import space.habitz.api.domain.mission.entity.MissionRecognition;

@Builder
public record MissionRecognitionDto(
	String image,
	String content,
	LocalDateTime updatedAt
) {
	public static MissionRecognitionDto of(MissionRecognition missionRecognition) {
		if (missionRecognition == null) {
			return null;
		}
		// mission 조회 시, 존재하는 인증 정보를 가져온다.
		return MissionRecognitionDto.builder()
			.image(missionRecognition.getImage())
			.content(missionRecognition.getContent())
			.updatedAt(missionRecognition.getUpdatedAt())
			.build();
	}
}
