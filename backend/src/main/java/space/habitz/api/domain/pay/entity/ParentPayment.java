package space.habitz.api.domain.pay.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import space.habitz.api.domain.member.entity.Parent;

@Entity
public class ParentPayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name = "parent_id")
	private Parent parent;
	@Column(name = "amount")
	private int amount;
	@Column(name = "order_id")
	private String orderId;
	@Column(name = "purchased_at")
	private Timestamp purchasedAt;
	@Column(name = "result")
	private String result;
}
