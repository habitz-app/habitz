package space.habitz.api.domain.product.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.product.domain.Product;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.dto.ResponseProductDto;
import space.habitz.api.domain.product.repository.ProductRepository;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;

	@Override
	public ResponseProductDto getProductDetail(Long id) {
		Product get = productRepository.findProductById(id)
			.orElse(null);
		if (get == null) {
			return ResponseProductDto.builder()
				.message("Product not found")
				.status("fail")
				.build();
		}

		return ResponseProductDto.builder()
			.message("")
			.status("success")
			.productInfo(ProductInfoDto.builder()
				.productId(get.getId())
				.productName(get.getName())
				.price(get.getPrice())
				.productImage(get.getImage())
				.description(get.getDescription())
				.category(get.getCategory())
				.build()).build();
	}
}
