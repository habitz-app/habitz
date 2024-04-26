package space.habitz.api.domain.point.entity;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Getter;
import space.habitz.api.domain.member.entity.Child;

@Getter
@Entity
@Table(name = "child_point_history")
public class ChildPointHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "child_id")
	private Child child;

	@Column(name = "point")
	private Long point;
	@Column(name = "total_point")
	private Long totalPoint;
	@Column(name = "created_at")
	private Timestamp createdAt;
	@Column(name = "mission_id")
	private Long missionId;
	@Column(name = "payment_id")
	private Long paymentId;

}
