package space.habitz.api.domain.product.dto;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
public class ChildBannedProductInfo {
	private String childUuid;
	private String name;
	private String profileImageUrl;
	private Boolean isBanned;

	@QueryProjection
	public ChildBannedProductInfo(String childUuid, String name, String profileImageUrl, Boolean isBanned) {
		this.childUuid = childUuid;
		this.name = name;
		this.profileImageUrl = profileImageUrl;
		this.isBanned = isBanned;
	}
}
