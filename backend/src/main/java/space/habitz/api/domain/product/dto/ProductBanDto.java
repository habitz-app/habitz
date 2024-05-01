package space.habitz.api.domain.product.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductBanDto {
	private Long productId;
	private Long childId;
}
