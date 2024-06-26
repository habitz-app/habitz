package space.habitz.api.domain.mission.entity;

import java.time.LocalDate;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.mission.dto.UpdateMissionRequestDto;
import space.habitz.api.domain.schedule.dto.UpdateScheduleRequestDto;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SQLDelete(sql = "UPDATE mission SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = 0")
@Table(name = "mission")
public class Mission extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
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

	@Column(name = "date")
	private LocalDate date;

	@Builder.Default
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private StatusCode status = StatusCode.EMPTY;

	@Builder.Default
	@Column(name = "is_deleted")
	private boolean isDeleted = Boolean.FALSE;

	@Column(name = "repeat_yn")
	private boolean repeatable;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "approve_parent")
	private Member approveParent;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "mission", optional = true)
	private MissionRecognition missionRecognition;

	@Column(name = "comment", nullable = true)
	private String comment; // 미션 인증 시 부모님의 코멘트

	public void updateStatus(StatusCode status) {
		this.status = status;
	}

	public void updateMission(UpdateMissionRequestDto request) {
		this.title = request.title();
		this.content = request.content();
		this.emoji = request.emoji();
		this.point = request.point();
		this.date = request.date();
	}

	public void updateSchedule(UpdateScheduleRequestDto request) {
		this.title = request.title();
		this.content = request.content();
		this.emoji = request.emoji();
		this.point = request.point();
	}

	public void updateStatus(StatusCode statusCode, Member parent, String comment) {
		this.status = statusCode;
		this.approveParent = parent;
		this.comment = comment;
	}
}
