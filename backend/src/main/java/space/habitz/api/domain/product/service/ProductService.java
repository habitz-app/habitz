package space.habitz.api.domain.product.service;

import space.habitz.api.domain.product.dto.ResponseProductDto;

public interface ProductService {
	ResponseProductDto getProductDetail(Long id);
}
