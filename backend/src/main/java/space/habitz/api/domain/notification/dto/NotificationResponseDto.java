package space.habitz.api.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.notification.entity.Notification;
import space.habitz.api.domain.notification.entity.NotificationType;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDto {
	private Long notificationId;
	private Long memberId;
	private NotificationType type;
	private String title;
	private String content;
	private String memberUuid;
	private boolean isRead;

	public static NotificationResponseDto convertTo(Notification notification) {
		return NotificationResponseDto.builder()
			.notificationId(notification.getId())
			.title(notification.getTitle())
			.content(notification.getContent())
			.memberId(notification.getMember().getId())
			.memberUuid(notification.getMember().getUuid())
			.type(notification.getType())
			.isRead(notification.getReadAt() == null)
			.build();
	}
}
