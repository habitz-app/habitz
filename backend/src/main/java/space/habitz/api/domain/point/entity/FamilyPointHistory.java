package space.habitz.api.domain.point.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.pay.entity.ParentPayment;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyPointHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "remain_point")
	private int remainPoint;

	@Column(name = "pay_point")
	private int payPoint;

	@ManyToOne
	@JoinColumn(name = "payment_id") // 부모 포인트 결제 내역 id
	private ParentPayment parentPayment;

	@ManyToOne
	@JoinColumn(name = "mission_id") // 결제 내역 id
	private Mission mission;

}
