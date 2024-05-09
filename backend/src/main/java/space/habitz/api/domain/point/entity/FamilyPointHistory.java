package space.habitz.api.domain.point.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Family;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.pay.entity.ParentPayment;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FamilyPointHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "family_id")
	private Family family;

	// 닉네임 가져오기 위해서
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "content", length = 1500)
	private String content;

	@Column(name = "total_point")
	private int totalPoint;

	@Column(name = "pay_point")
	private int payPoint;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "payment_id") // 부모 포인트 결제 내역 id
	private ParentPayment parentPayment;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mission_id") // 결제 내역 id
	private Mission mission;

	@CreationTimestamp
	private Timestamp createdAt;

}
