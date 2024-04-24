package space.habitz.api.domain.product.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.product.domain.Product;
import space.habitz.api.domain.product.repository.ProductRepository;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;

	@Override
	public Product getProductDetail(Long id) {
		return productRepository.findProductById(id)
			.orElseThrow(() -> new IllegalArgumentException("Product not found"));
	}
}
