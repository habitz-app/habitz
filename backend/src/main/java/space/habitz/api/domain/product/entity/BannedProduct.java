package space.habitz.api.domain.product.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BannedProduct {
	@EmbeddedId
	private BannedProductID bannedProductID;
}
