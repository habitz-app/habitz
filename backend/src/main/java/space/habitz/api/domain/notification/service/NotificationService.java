package space.habitz.api.domain.notification.service;

import space.habitz.api.domain.notification.dto.FamilyNotificationEvent;
import space.habitz.api.domain.notification.dto.NotificationResponseDto;
import space.habitz.api.domain.notification.dto.SingleNotificationEvent;
import space.habitz.api.domain.notification.entity.Notification;

import java.util.List;

public interface NotificationService {
	List<Notification> createFamilyNotification(FamilyNotificationEvent familyNotificationEvent);
	Notification createSingleNotification(SingleNotificationEvent singleNotificationEvent);

	List<NotificationResponseDto> getNotification();

	void updateRead(Long id);

	void delete(Long id);
}
