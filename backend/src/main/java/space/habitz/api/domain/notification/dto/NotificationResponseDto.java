package space.habitz.api.domain.notification.dto;

import java.time.LocalDateTime;

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
	private LocalDateTime createdAt;
	private String href;

	public static NotificationResponseDto convertTo(Notification notification) {
		return NotificationResponseDto.builder()
			.notificationId(notification.getId())
			.type(notification.getType())
			.title(notification.getTitle())
			.content(notification.getContent())
			.memberId(notification.getMember().getId())
			.memberUuid(notification.getMember().getUuid())
			.type(notification.getType())
			.isRead(notification.getReadAt() != null)
			.createdAt(notification.getCreatedAt())
			.href(notification.getHref())
			.build();
	}
}
