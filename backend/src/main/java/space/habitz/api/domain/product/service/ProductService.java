package space.habitz.api.domain.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.entity.BannedProduct;
import space.habitz.api.domain.member.entity.Member;

public interface ProductService {
	ProductInfoDto getProductDetail(Long id);

	Page<ProductInfoDto> getProductList(Pageable pageable);

	Page<ProductInfoDto> getBannedProductInfo(Long childId, Pageable pageable);

	BannedProduct setBanProduct(Member parent, Long productId, Long childId);

}
