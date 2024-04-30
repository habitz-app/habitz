package space.habitz.api.domain.product.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

@Entity
public class BannedProduct {
	@EmbeddedId
	private BannedProductID bannedProductID;
}
