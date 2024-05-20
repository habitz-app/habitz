package space.habitz.api.domain.notification.service;

import java.util.List;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.notification.dto.*;
import space.habitz.api.domain.notification.entity.Notification;

public interface NotificationService {
	List<Notification> createFamilyNotification(FamilyNotificationEvent familyNotificationEvent);

	List<Notification> createParentNotification(ParentNotificationEvent parentNotificationEvent);

	List<Notification> createMultiNotification(MultiNotificationEvent multiNotificationEvent);

	Notification createSingleNotification(SingleNotificationEvent singleNotificationEvent);

	List<NotificationResponseDto> getNotification();

	void updateRead(Long id);

	void delete(Long id);

	void updateAllRead(Member member);

	int getNotificationCount(Member member);
}
