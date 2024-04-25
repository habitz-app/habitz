package space.habitz.api.domain.product.service;

import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.global.response.ResponseData;

public interface ProductService {
	ResponseData<ProductInfoDto> getProductDetail(Long id);
}
