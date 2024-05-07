package space.habitz.api.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.ApplicationEvent;
import space.habitz.api.domain.notification.entity.NotificationType;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SingleNotificationEvent {
	private NotificationType notificationType;
	private String content;
	private Long memberId;
}
