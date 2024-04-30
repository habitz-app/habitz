package space.habitz.api.domain.product.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import space.habitz.api.domain.product.entity.Product;

public interface BannedProductCustomRepository {
	Page<Product> findProductsByChildId(Long childId, Pageable pageable);
}
