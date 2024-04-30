package space.habitz.api.domain.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.global.response.ResponseData;

public interface ProductService {
	ResponseData<ProductInfoDto> getProductDetail(Long id);

	Page<ProductInfoDto> getProductList(Pageable pageable);

	Page<ProductInfoDto> getBannedProductInfo(Long childId, Pageable pageable);
}
