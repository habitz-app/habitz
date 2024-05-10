package space.habitz.api.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.notification.entity.NotificationType;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SingleNotificationEvent {
	private NotificationType notificationType;
	private String content;
	private Long memberId;

	/**
	 * 아이에게 부모가 승인/거절 결과를 전송
	 * */
	public static SingleNotificationEvent missionResult(Long memberId, String missionTitle, boolean isAccpeted) {
		return SingleNotificationEvent.builder()
			.notificationType(isAccpeted ? NotificationType.MISSION_ACCEPT : NotificationType.MISSION_DECLINE)
			.memberId(memberId)
			.content(missionTitle)
			.build();
	}
}
