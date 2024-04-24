package space.habitz.api.domain.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ProductInfoDto {
	Long productId;
	String productName;
	int price;
	String productImage;
	String description;
	String category;
	String brand;
}
