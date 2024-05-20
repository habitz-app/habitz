package space.habitz.api.domain.product.dto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class ProductInfoDto {
	Long productId;
	String productName;
	int price;
	String productImage;
	String description;
	String category;
	String brand;

	// Q파일 생성을 위한 생성자
	@QueryProjection
	public ProductInfoDto(Long productId, String productName, int price, String productImage, String description,
		String category, String brand) {
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.productImage = productImage;
		this.description = description;
		this.category = category;
		this.brand = brand;
	}
}
