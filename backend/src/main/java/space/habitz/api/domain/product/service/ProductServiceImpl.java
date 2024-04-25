package space.habitz.api.domain.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.product.domain.Product;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.repository.ProductRepository;
import space.habitz.api.global.response.ResponseData;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;

	@Override
	public ResponseData<ProductInfoDto> getProductDetail(Long id) {
		Product get = productRepository.findProductById(id)
			.orElse(null);
		if (get == null) {
			return new ResponseData<>("fail", "상품 정보가 없습니다.", null);
		}

		return
			new ResponseData<>("success", "상품 정보 조회 성공", ProductInfoDto.builder()
				.productId(get.getId())
				.productName(get.getName())
				.price(get.getPrice())
				.productImage(get.getImage())
				.description(get.getDescription())
				.category(get.getCategory())
				.build());

	}

	@Override
	public Page<ProductInfoDto> getProductList(int page, int size) {
		return productRepository.findAll(PageRequest.of(page, size))
			.map(product -> ProductInfoDto.builder()
				.productId(product.getId())
				.productName(product.getName())
				.price(product.getPrice())
				.productImage(product.getImage())
				.description(product.getDescription())
				.category(product.getCategory())
				.build());

	}
}
