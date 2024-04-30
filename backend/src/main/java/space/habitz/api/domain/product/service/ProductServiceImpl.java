package space.habitz.api.domain.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.product.entity.Product;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.repository.BannedProductRepository;
import space.habitz.api.domain.product.repository.ProductRepository;
import space.habitz.api.global.exception.CustomNotFoundException;
import space.habitz.api.global.response.ResponseData;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final BannedProductRepository bannedProductRepository;

	@Override
	public ProductInfoDto getProductDetail(Long id) {
		Product get = productRepository.findProductById(id)
			.orElseThrow(() -> new CustomNotFoundException(id));

		return ProductInfoDto.builder()
			.productId(get.getId())
			.productName(get.getName())
			.price(get.getPrice())
			.productImage(get.getImage())
			.description(get.getDescription())
			.category(get.getCategory())
			.build();

	}

	@Override
	public Page<ProductInfoDto> getProductList(Pageable pageable) {
		return productRepository.findAll(pageable)
			.map(product -> ProductInfoDto.builder()
				.productId(product.getId())
				.productName(product.getName())
				.price(product.getPrice())
				.productImage(product.getImage())
				.description(product.getDescription())
				.category(product.getCategory())
				.build());
	}

	@Override
	public Page<ProductInfoDto> getBannedProductInfo(Long childId, Pageable pageable) {
		return bannedProductRepository.findProductsByChildId(childId, pageable)
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
