package space.habitz.api.domain.product.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.point.entity.ChildPointHistory;
import space.habitz.api.domain.point.repository.ChildPointHistoryRepository;
import space.habitz.api.domain.product.dto.BrandDto;
import space.habitz.api.domain.product.dto.ChildBannedProductInfo;
import space.habitz.api.domain.product.dto.ChildPurchaseInfo;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.entity.ChildProductPaymentHistory;
import space.habitz.api.domain.product.entity.Product;
import space.habitz.api.domain.product.repository.BannedProductRepository;
import space.habitz.api.domain.product.repository.BrandRepository;
import space.habitz.api.domain.product.repository.ChildProductPaymentHistoryRepository;
import space.habitz.api.domain.product.repository.ProductRepository;
import space.habitz.api.global.exception.CustomAccessDeniedException;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.CustomNotFoundException;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final BannedProductRepository bannedProductRepository;
	private final ChildRepository childRepository;
	private final ChildProductPaymentHistoryRepository childProductPaymentHistoryRepository;
	private final ChildPointHistoryRepository childPointHistoryRepository;
	private final MemberRepository memberRepository;
	private final BrandRepository brandRepository;

	@Override
	public ProductInfoDto getProductDetail(Member member, Long id) {
		if (member.getRole() == Role.CHILD) {
			Long childId = childRepository.findByMember_Id(member.getId()).getId();
			if (bannedProductRepository.findByBannedProductID_ProductIdAndBannedProductID_ChildId(id, childId)
				!= null) {
				throw new CustomNotFoundException("제한된 상품입니다.");

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
			.brand(get.getBrand())
			.build();

	}

	@Override
	public Page<ProductInfoDto> getProductList(Member member, String category, String brand, Pageable pageable) {

		// 아이를 제외하고는 밴 한 상품 없음.
		if (member.getRole() != Role.CHILD) {
			return productRepository.findProductsByBrandAndCategory(
					brand, category, pageable)
				.map(product -> ProductInfoDto.builder()
					.productId(product.getId())
					.productName(product.getName())
					.price(product.getPrice())
					.productImage(product.getImage())
					.description(product.getDescription())
					.brand(product.getBrand())
					.category(product.getCategory())
					.build()
				);
		}
		List<Long> productIdList = bannedProductRepository.findBannedProductsByBannedProductID_ChildId(
				childRepository.findByMember_Id(member.getId()).getId()).stream()
			.map(
				bannedProduct -> bannedProduct.getBannedProductID().getProduct().getId())
			.toList();

		if (productIdList.isEmpty()) {
			return productRepository.findProductsByBrandAndCategory(
					brand, category, pageable)
				.map(product -> ProductInfoDto.builder()
					.productId(product.getId())
					.productName(product.getName())
					.price(product.getPrice())
					.productImage(product.getImage())
					.description(product.getDescription())
					.brand(product.getBrand())
					.category(product.getCategory())
					.build()
				);
		}
		return productRepository.findProductsByBrandAndCategoryAndIdIsNotIn(brand, category, productIdList, pageable)
			.map(product -> ProductInfoDto.builder()
				.productId(product.getId())
				.productName(product.getName())
				.price(product.getPrice())
				.productImage(product.getImage())
				.description(product.getDescription())
				.brand(product.getBrand())
				.category(product.getCategory())
				.build());
	}

	@Override
	public Page<ProductInfoDto> getBannedProductInfo(Member parent, String childUuid, Pageable pageable) {

		Member childMem = memberRepository.findByUuid(childUuid)
			.orElseThrow(() -> new CustomNotFoundException(childUuid));
		if (parent.getRole() == Role.CHILD || !childMem.getFamily().getId().equals(parent.getFamily().getId())) {
			throw new CustomNotFoundException("권한이 없습니다.");
		}
		Child child = childRepository.findByMember_Id(childMem.getId());

		return bannedProductRepository.findProductsByChildId(child.getId(), pageable)
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
	@Transactional
	public void setBanProduct(Member parent, Long productId, String childUuid) {
		Member childMem = memberRepository.findByUuid(childUuid)
			.orElseThrow(() -> new CustomNotFoundException(childUuid));

		if (parent.getRole() != Role.PARENT || !parent.getFamily().getId().equals(childMem.getFamily().getId())) {
			throw new CustomAccessDeniedException("허용되지 않은 사용자입니다.");
		}
		Long childIdLong = childRepository.findByMember_Id(childMem.getId()).getId();
		Product product = productRepository.findProductById(productId)
			.orElseThrow(() -> new CustomNotFoundException(productId));
		Child child = childRepository.findById_AndMember_Family_Id(childIdLong, parent.getFamily().getId())
			.orElseThrow(() -> new CustomNotFoundException(childUuid));

		bannedProductRepository.insertBannedProduct(product.getId(), child.getId());

	}

	@Override
	public void deleteBanProduct(Member parent, Long productId, String childUuid) {
		if (parent.getRole() != Role.PARENT) {
			throw new CustomNotFoundException("Not Parent");
		}
		Long childId = childRepository.findByMember_Id(memberRepository.findByUuid(childUuid)
			.orElseThrow(() -> new CustomNotFoundException(childUuid)).getId()).getId();
		Product product = productRepository.findProductById(productId)
			.orElseThrow(() -> new CustomNotFoundException(productId));
		Child child = childRepository.findById_AndMember_Family_Id(childId, parent.getFamily().getId())
			.orElseThrow(() -> new CustomNotFoundException(childUuid));
		bannedProductRepository.deleteByBannedProductID_ProductIdAndBannedProductID_ChildId(product.getId(),
			child.getId());
	}

	@Override
	@Transactional
	public Long purchaseProduct(Member member, Long productId) {
		if (member.getRole() != Role.CHILD) {
			throw new CustomAccessDeniedException("상품은 아이만 구매 가능합니다.");
		}

		// 구매 로직
		Child child = childRepository.findByMember_Id(member.getId());
		ProductInfoDto productInfoDto = getProductDetail(member, productId);
		if (child.getPoint() < productInfoDto.getPrice()) {
			throw new CustomErrorException("포인트가 부족합니다.");
		}

		child.setPoint(child.getPoint() - productInfoDto.getPrice());

		ChildProductPaymentHistory childProductPaymentHistory =
			ChildProductPaymentHistory.builder()
				.child(child)
				.product(productRepository.findProductById(productId)
					.orElseThrow(() -> new CustomNotFoundException(productId)))
				.price(productInfoDto.getPrice())
				.build();
		childProductPaymentHistoryRepository.save(childProductPaymentHistory);

		ChildPointHistory childPointHistory =
			ChildPointHistory.builder()
				.child(child)
				.point(-productInfoDto.getPrice())
				.childProductPaymentHistory(childProductPaymentHistory)
				.totalPoint(child.getPoint())
				.content(productInfoDto.getProductName() + " 구매")
				.build();
		childPointHistoryRepository.save(childPointHistory);
		return childPointHistory.getId();

	}

	@Override
	public List<BrandDto> getBrandList(String category) {
		List<String> brandList = productRepository.findBrandByCategory(category);
		return brandRepository.findByNameIn(brandList)
			.stream()
			.map(brand -> new BrandDto(brand.getId(), brand.getName(), brand.getImage()))
			.toList();
	}

	@Override
	public List<ChildBannedProductInfo> getBannedProductInfo(Member parent, Long productId) {
		return bannedProductRepository.findBannedProductInfo(parent,
			productId);
	}

	@Override
	public List<ChildPurchaseInfo> getChildPurchaseInfoList(Member member) {
		Child child = childRepository.findByMember_Id(member.getId());
		return childProductPaymentHistoryRepository.listChildProductPaymentHistoryByChildId(child.getId());

	}

	@Override
	public ChildPurchaseInfo getChildPurchaseInfo(Member member, Long productPaymentId) {
		Child child = childRepository.findByMember_Id(member.getId());
		return childProductPaymentHistoryRepository.getChildProductPaymentHistoryByChildId(child.getId(),
			productPaymentId);
	}

}
