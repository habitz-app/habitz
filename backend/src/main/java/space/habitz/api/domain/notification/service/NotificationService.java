package space.habitz.api.domain.notification.service;

import java.util.List;

import space.habitz.api.domain.notification.dto.FamilyNotificationEvent;
import space.habitz.api.domain.notification.dto.NotificationResponseDto;
import space.habitz.api.domain.notification.dto.ParentNotificationEvent;
import space.habitz.api.domain.notification.dto.SingleNotificationEvent;
import space.habitz.api.domain.notification.entity.Notification;

public interface NotificationService {
	List<Notification> createFamilyNotification(FamilyNotificationEvent familyNotificationEvent);

	List<Notification> createParentNotification(ParentNotificationEvent parentNotificationEvent);

	Notification createSingleNotification(SingleNotificationEvent singleNotificationEvent);

	List<NotificationResponseDto> getNotification();

	void updateRead(Long id);

	void delete(Long id);
}
