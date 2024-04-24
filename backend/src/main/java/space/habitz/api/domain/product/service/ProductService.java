package space.habitz.api.domain.product.service;

import space.habitz.api.domain.product.domain.Product;

public interface ProductService {
	Product getProductDetail(Long id);
}
