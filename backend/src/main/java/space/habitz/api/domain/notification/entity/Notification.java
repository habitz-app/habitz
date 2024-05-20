package space.habitz.api.domain.notification.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.global.entity.BaseTimeEntity;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Notification extends BaseTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;

	@Column(name = "type")
	@Enumerated(EnumType.STRING)
	private NotificationType type;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "href")
	private String href;

	@Column(name = "read_at")
	private LocalDateTime readAt;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

	public void read() {
		readAt = LocalDateTime.now();
	}

	public void delete() {
		deletedAt = LocalDateTime.now();
	}
}

