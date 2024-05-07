package space.habitz.api.domain.product.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.entity.BannedProduct;
import space.habitz.api.domain.product.entity.BannedProductID;
import space.habitz.api.domain.product.entity.Product;
import space.habitz.api.domain.product.repository.BannedProductRepository;
import space.habitz.api.domain.product.repository.ProductRepository;
import space.habitz.api.global.exception.CustomNotFoundException;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final BannedProductRepository bannedProductRepository;
	private final ChildRepository childRepository;

	@Override
	public ProductInfoDto getProductDetail(Member member, Long id) {
		if (member.getRole() == Role.CHILD) {
			Long childId = childRepository.findByMember_Id(member.getId()).getId();
			if (bannedProductRepository.findByBannedProductID_ProductIdAndBannedProductID_ChildId(id, childId)
				!= null) {
				throw new CustomNotFoundException("Banned Product");

			}
		}
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
	public Page<ProductInfoDto> getProductList(Member member, String category, String brand, Pageable pageable) {

		// 아이를 제외하고는 밴 한 상품 없음.
		if (member.getRole() != Role.CHILD) {
			return productRepository.findByBrandAndCategoryAndIdIsNotIn(
					category, brand, List.of(), pageable)
				.map(product -> ProductInfoDto.builder()
					.productId(product.getId())
					.productName(product.getName())
					.price(product.getPrice())
					.productImage(product.getImage())
					.description(product.getDescription())
					.category(product.getCategory())
					.build()
				);
		}
		List<Long> productIdList = bannedProductRepository.findBannedProductsByBannedProductID_ChildId(
				childRepository.findByMember_Id(member.getId()).getId()).stream()
			.map(
				bannedProduct -> bannedProduct.getBannedProductID().getProduct().getId())
			.toList();
		System.out.println(productIdList);
		return productRepository.findByBrandAndCategoryAndIdIsNotIn(category, brand, productIdList, pageable)
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

	@Override
	public BannedProduct setBanProduct(Member parent, Long productId, Long childId) {
		Product product = productRepository.findProductById(productId)
			.orElseThrow(() -> new CustomNotFoundException(productId));
		Child child = childRepository.findById_AndMember_Family_Id(childId, parent.getFamily().getId())
			.orElseThrow(() -> new CustomNotFoundException(childId));
		bannedProductRepository.insertBannedProduct(product.getId(), child.getId());

		return BannedProduct.builder()
			.bannedProductID(new BannedProductID(product, child))
			.build();

	}

	@Override
	public void deleteBanProduct(Member parent, Long productId, Long childId) {
		if (parent.getRole() != Role.PARENT) {
			throw new CustomNotFoundException("Not Parent");
		}
		Product product = productRepository.findProductById(productId)
			.orElseThrow(() -> new CustomNotFoundException(productId));
		Child child = childRepository.findById_AndMember_Family_Id(childId, parent.getFamily().getId())
			.orElseThrow(() -> new CustomNotFoundException(childId));
		bannedProductRepository.deleteByBannedProductID_ProductIdAndBannedProductID_ChildId(product.getId(),
			child.getId());
	}

}
