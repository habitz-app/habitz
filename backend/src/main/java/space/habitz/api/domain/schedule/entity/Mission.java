package space.habitz.api.domain.schedule.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Parent;

@Entity
@Data
public class Mission {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "schedule_id")
	private Schedule schedule;
	@ManyToOne
	@JoinColumn(name = "child_id")
	private Child child;
	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Parent parent;
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
	@Column(name = "created_at")
	private Timestamp createdAt;
	@Column(name = "updated_at")
	private Timestamp updatedAt;
	@Column(name = "is_deleted")
	private boolean isDeleted;
	@Column(name = "repeat_yn")
	private boolean repeatYn;
}
