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
public class ParentNotificationEvent {
	private NotificationType notificationType;
	private String content;
	private Long childMemberId;

	/**
	 *부모에게 미션 완료할 때 전송
	 * */
	public static ParentNotificationEvent missionSubmit(Long childId, String missionTitle) {
		return ParentNotificationEvent.builder()
			.notificationType(NotificationType.MISSION_SUBMIT)
			.childMemberId(childId)
			.content(missionTitle)
			.build();
	}
}
