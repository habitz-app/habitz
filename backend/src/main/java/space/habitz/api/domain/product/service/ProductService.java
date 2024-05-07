package space.habitz.api.domain.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.entity.BannedProduct;

public interface ProductService {
	ProductInfoDto getProductDetail(Member member, Long id);

	Page<ProductInfoDto> getProductList(Member member, String category, String brand, Pageable pageable);

	Page<ProductInfoDto> getBannedProductInfo(Long childId, Pageable pageable);

	BannedProduct setBanProduct(Member parent, Long productId, Long childId);

	void deleteBanProduct(Member parent, Long productId, Long childId);

	void purchaseProduct(Member member, Long productId);
}
