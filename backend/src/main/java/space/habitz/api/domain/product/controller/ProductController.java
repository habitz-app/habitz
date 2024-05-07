package space.habitz.api.domain.product.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.product.dto.ProductBanDto;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.entity.BannedProduct;
import space.habitz.api.domain.product.service.ProductService;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {
	private final ProductService productService;

	@ApiResponse(description = "상품 상세 조회")
	@GetMapping("/{productId}")
	public ResponseData<ProductInfoDto> getProductDetail(
		@AuthenticationPrincipal Member member,
		@Parameter(description = "상품 ID", required = true) @PathVariable("productId") long productId) {
		return new ResponseData<>("success", "상품 상세 조회 성공", productService.getProductDetail(member, productId));
	}

	@ApiResponse(description = "상품 리스트 조회")
	@GetMapping("/list/{category}/{brand}")
	public ResponseData<Page<ProductInfoDto>> getProductList(
		@AuthenticationPrincipal Member member,
		@Parameter(description = "카테고리", required = true) @PathVariable("category") String category,
		@Parameter(description = "브랜드", required = true) @PathVariable("brand") String brand,
		Pageable pageable) {
		return new ResponseData<>("success", "상품 리스트 조회 성공",
			productService.getProductList(member, brand, category, pageable));
	}

	@ApiResponse(description = "제한한 상품 조회")
	@GetMapping("/banned-product/list/{childId}")
	public ResponseData<Page<ProductInfoDto>> getBannedProductList(
		Pageable pageable,
		@Parameter(description = "Child ID", required = true) @PathVariable("childId") long childId) {
		return new ResponseData<>("success", "제한한 상품 조회 성공", productService.getBannedProductInfo(childId, pageable));
	}

	@ApiResponse(description = "상품 제한하기")
	@PostMapping("/banned-product/restrict")
	public ResponseData<BannedProduct> getBannedProductList(@AuthenticationPrincipal Member member,
		@RequestBody ProductBanDto productBanDto) {
		System.out.println("member ");
		System.out.println(member.getId());

		return new ResponseData<>("success", "상품 제한 성공",
			productService.setBanProduct(member, productBanDto.getProductId(), productBanDto.getChildId()));
	}

	@ApiResponse(description = "상품 제한 해제")
	@DeleteMapping("/banned-product/restrict")
	public ResponseData<String> deleteBannedProduct(@AuthenticationPrincipal Member member,
		@RequestBody ProductBanDto productBanDto) {
		productService.deleteBanProduct(member, productBanDto.getProductId(), productBanDto.getChildId());
		return new ResponseData<>("success", "상품 제한 해제 성공", "상품 제한 해제 성공");
	}
}
