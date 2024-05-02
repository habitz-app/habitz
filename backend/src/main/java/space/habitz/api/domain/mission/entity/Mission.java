package space.habitz.api.domain.mission.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.global.entity.MutableTimeEntity;
import space.habitz.api.global.type.StatusCode;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mission SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Table(name = "mission")
public class Mission extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "child_id")
	private Member child;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	private Member parent;

	@Column(name = "content")
	private String content;

	@Column(name = "title")
	private String title;

	@Column(name = "emoji")
	private String emoji;

	@Column(name = "point")
	private int point;

	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private StatusCode status;

	@Column(name = "is_deleted")
	private boolean isDeleted = Boolean.FALSE;

	@Column(name = "repeat_yn")
	private boolean repeatable;
}
