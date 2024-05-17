package space.habitz.api.domain.product.dto;

import java.sql.Timestamp;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@Getter
public class ChildPurchaseInfo {
	Long purchaseId;
	int price;
	Timestamp purchaseDate;
	int totalPoint;
	ProductInfoDto productInfo;

	@QueryProjection
	public ChildPurchaseInfo(Long purchaseId, int price, Timestamp purchaseDate, int totalPoint,
		ProductInfoDto productInfo) {
		this.purchaseId = purchaseId;
		this.price = price;
		this.purchaseDate = purchaseDate;
		this.totalPoint = totalPoint;
		this.productInfo = productInfo;
	}
}
