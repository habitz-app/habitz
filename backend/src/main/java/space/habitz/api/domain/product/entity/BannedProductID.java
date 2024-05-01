package space.habitz.api.domain.product.entity;

import java.io.Serializable;

import lombok.*;
import org.hibernate.annotations.Fetch;

import jakarta.persistence.Embeddable;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.ManyToOne;
import space.habitz.api.domain.member.entity.Child;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BannedProductID implements Serializable {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "child_id")
	private Child child;

}
