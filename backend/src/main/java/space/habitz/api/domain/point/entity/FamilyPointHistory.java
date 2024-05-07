package space.habitz.api.domain.point.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class FamilyPointHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "remain_point")
	private int remainPoint;

	@Column(name = "pay_point")
	private int payPoint;

	@Column(name = "charge_id") // 부모 포인트 결제 내역 id
	private Long chargeId;

	@Column(name = "payment_id") // 자녀 미션 승인 id
	private Long paymentId;

}
