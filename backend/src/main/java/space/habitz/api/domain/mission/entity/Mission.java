package space.habitz.api.domain.mission.entity;

import jakarta.persistence.*;
import lombok.Data;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Data
public class Mission extends MutableTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;

	@ManyToOne
	@JoinColumn(name = "child_id")
	private Member child;

	@ManyToOne
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
	private String status;

	@Column(name = "is_deleted")
	private boolean isDeleted;

	@Column(name = "repeat_yn")
	private boolean repeatable;
}
