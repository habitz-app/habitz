package space.habitz.api.domain.product.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.product.dto.BrandDto;
import space.habitz.api.domain.product.dto.ChildBannedProductInfo;
import space.habitz.api.domain.product.dto.ChildPurchaseInfo;
import space.habitz.api.domain.product.dto.ProductInfoDto;

public interface ProductService {
	ProductInfoDto getProductDetail(Member member, Long id);

	Page<ProductInfoDto> getProductList(Member member, String category, String brand, Pageable pageable);

	Page<ProductInfoDto> getBannedProductInfo(Member parent, String childId, Pageable pageable);

	void setBanProduct(Member parent, Long productId, String childId);

	void deleteBanProduct(Member parent, Long productId, String childId);

	Long purchaseProduct(Member member, Long productId);

	List<BrandDto> getBrandList(String category);

	List<ChildBannedProductInfo> getBannedProductInfo(Member parent, Long productId);

	List<ChildPurchaseInfo> getChildPurchaseInfoList(Member member);

	ChildPurchaseInfo getChildPurchaseInfo(Member member, Long productPaymentId);

	List<ChildPurchaseInfo> getChildPurchaseInfoList(Member member, String childUuid);

}

