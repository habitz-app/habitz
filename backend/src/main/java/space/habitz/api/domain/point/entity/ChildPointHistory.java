package space.habitz.api.domain.point.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.product.entity.ChildProductPaymentHistory;

/*
 * 자녀 포인트 내역 enttiy,
 * 자녀가 미션을 수행해서 포인트를 충전하거나 사용할 때 생성되는 포인트 내역
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
	private int point;

	@Column(name = "total_point")
	private int totalPoint;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "content")
	private String content;

	@ManyToOne(fetch = FetchType.LAZY) // 추후에 미션 승인 entity로 변경 예정
	@JoinColumn(name = "mission_id")
	private Mission mission;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payment_id") // 물건 구매 내역을 통한 포인트 사용
	private ChildProductPaymentHistory childProductPaymentHistory;

}
