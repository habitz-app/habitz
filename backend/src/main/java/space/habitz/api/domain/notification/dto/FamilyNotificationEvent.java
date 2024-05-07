package space.habitz.api.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.ApplicationEvent;
import space.habitz.api.domain.notification.entity.NotificationType;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamilyNotificationEvent {
	private NotificationType notificationType;
	private String content;
	private Long childMemberId;

	@Builder.Default
	private List<Long> parentMemberId = new ArrayList<>();
}
