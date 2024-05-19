package space.habitz.api.domain.notification.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.exeption.MemberNotFoundException;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.member.utils.AuthUtils;
import space.habitz.api.domain.notification.dto.FamilyNotificationEvent;
import space.habitz.api.domain.notification.dto.NotificationResponseDto;
import space.habitz.api.domain.notification.dto.ParentNotificationEvent;
import space.habitz.api.domain.notification.dto.SingleNotificationEvent;
import space.habitz.api.domain.notification.entity.Notification;
import space.habitz.api.domain.notification.entity.NotificationType;
import space.habitz.api.domain.notification.exception.NotificationNotFoundException;
import space.habitz.api.domain.notification.repository.NotificationRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
	private final NotificationRepository notificationRepository;
	private final FamilyRepository familyRepository;

	@Override
	@TransactionalEventListener(FamilyNotificationEvent.class)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Notification> createFamilyNotification(FamilyNotificationEvent familyNotificationEvent) {
		Notification childNotification = getChildNotification(familyNotificationEvent);
		List<Notification> parentNotification = getParentNotification(familyNotificationEvent);

		List<Notification> combinedNotification = Stream.of(childNotification)
			.filter(Objects::nonNull)
			.flatMap(notification -> Stream.concat(Stream.of(notification), parentNotification.stream()))
			.toList();

		return notificationRepository.saveAll(combinedNotification);
	}

	@Override
	@TransactionalEventListener(ParentNotificationEvent.class)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Notification> createParentNotification(ParentNotificationEvent parentNotificationEvent) {
		List<Notification> parentNotification = getParentNotification(parentNotificationEvent);
		return notificationRepository.saveAll(parentNotification);
	}

	@Override
	@TransactionalEventListener(SingleNotificationEvent.class)
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public Notification createSingleNotification(SingleNotificationEvent singleNotificationEvent) {
		NotificationType notificationType = singleNotificationEvent.getNotificationType();
		Long memberId = singleNotificationEvent.getMemberId();
		Member member = familyRepository.findByMemberId(memberId)
			.orElseThrow(() -> new MemberNotFoundException(memberId));

		Notification notification = Notification.builder()
			.title(notificationType.getTitle())
			.content(notificationType.getChildContents(singleNotificationEvent.getContent()))
			.type(notificationType)
			.member(member)
			.build();
		return notificationRepository.save(notification);
	}

	@Override
	public List<NotificationResponseDto> getNotification() {
		Member authenticatedMember = AuthUtils.getAuthenticatedMember();
		List<Notification> notifications = notificationRepository.findAllByMemberAndDeletedAtIsNullOrderByCreatedAtDesc(
			authenticatedMember);

		return notifications.stream().map(NotificationResponseDto::convertTo).toList();
	}

	@Override
	public void updateRead(Long id) {
		Notification notification = notificationRepository.findByIdAndDeletedAtIsNull(id)
			.orElseThrow(() -> new NotificationNotFoundException(id));
		notification.read();
		notificationRepository.save(notification);
	}

	@Override
	public void delete(Long id) {
		Notification notification = notificationRepository.findByIdAndDeletedAtIsNull(id)
			.orElseThrow(() -> new NotificationNotFoundException(id));
		notification.delete();
		notificationRepository.save(notification);
	}

	@Override
	@Transactional
	public void updateAllRead(Member member) {
		List<Notification> notifications = notificationRepository.findAllByMember_IdAndReadAtIsNullAndDeletedAtIsNull(
			member.getId());
		notifications.forEach(Notification::read);
		notificationRepository.saveAll(notifications);
	}

	@Override
	public int getNotificationCount(Member member) {
		return notificationRepository.countByMember_IdAndReadAtIsNullAndDeletedAtIsNull(member.getId());
	}

	private Notification getChildNotification(FamilyNotificationEvent familyNotificationEvent) {
		NotificationType notificationType = familyNotificationEvent.getNotificationType();
		String content = familyNotificationEvent.getContent();
		Long childMember = familyNotificationEvent.getChildMemberId();

		if (notificationType.getChildContents(content) == null)
			return null;

		Member child = familyRepository.findByMemberId(childMember)
			.orElseThrow(() -> new MemberNotFoundException(childMember));

		return Notification.builder()
			.type(notificationType)
			.title(notificationType.getTitle())
			.content(notificationType.getChildContents(content))
			.member(child)
			.build();
	}

	private List<Notification> getParentNotification(FamilyNotificationEvent familyNotificationEvent) {
		NotificationType notificationType = familyNotificationEvent.getNotificationType();
		String content = familyNotificationEvent.getContent();
		List<Long> parentMemberId = familyNotificationEvent.getParentMemberId();
		Long childMemberId = familyNotificationEvent.getChildMemberId();
		List<Member> parentMembers;

		Member childMember = familyRepository.findByMemberId(childMemberId)
			.orElseThrow(() -> new MemberNotFoundException(childMemberId));

		if (parentMemberId.isEmpty())
			parentMembers = familyRepository.findByFamilyIdOnlyParentMember(childMember.getFamily().getId(), true);

		else
			parentMembers = familyRepository.findByMemberIds(parentMemberId);

		return parentMembers.stream().map(member -> {
			return Notification.builder()
				.type(notificationType)
				.title(notificationType.getTitle())
				.content(notificationType.getParentContents(childMember, content))
				.member(member)
				.build();
		}).toList();
	}

	private List<Notification> getParentNotification(ParentNotificationEvent parentNotificationEvent) {
		NotificationType notificationType = parentNotificationEvent.getNotificationType();
		String content = parentNotificationEvent.getContent();
		Long childMemberId = parentNotificationEvent.getChildMemberId();

		Member childMember = familyRepository.findByMemberId(childMemberId)
			.orElseThrow(() -> new MemberNotFoundException(childMemberId));

		List<Member> parentMembers = familyRepository.findByFamilyIdOnlyParentMember(childMember.getFamily().getId(),
			true);

		return parentMembers.stream().map(member -> {
			return Notification.builder()
				.type(notificationType)
				.title(notificationType.getTitle())
				.content(notificationType.getParentContents(childMember, content))
				.member(member)
				.build();
		}).toList();
	}
}
