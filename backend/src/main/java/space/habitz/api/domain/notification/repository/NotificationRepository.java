package space.habitz.api.domain.notification.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	@EntityGraph(attributePaths = {"member"})
	List<Notification> findAllByMemberAndDeletedAtIsNullOrderByCreatedAtDesc(Member member);

	Optional<Notification> findByIdAndDeletedAtIsNull(Long id);

	List<Notification> findAllByMember_IdAndReadAtIsNullAndDeletedAtIsNull(Long memberId);

	int countByMember_IdAndReadAtIsNullAndDeletedAtIsNull(Long memberId);
}
