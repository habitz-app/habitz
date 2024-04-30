package space.habitz.api.domain.product.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.domain.product.dto.ProductInfoDto;
import space.habitz.api.domain.product.service.ProductService;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
	private final ProductService productService;

	@ApiResponse(description = "상품 상세 조회")
	@GetMapping("/{productId}")
	public ResponseData<ProductInfoDto> getProductDetail(
		@Parameter(description = "상품 ID", required = true) @PathVariable("productId") long productId) {
		return productService.getProductDetail(productId);
	}

	@ApiResponse(description = "상품 리스트 조회")
	@GetMapping("/list")
	public ResponseData<Page<ProductInfoDto>> getProductList(Pageable pageable) {
		return new ResponseData<>("success", "상품 리스트 조회 성공", productService.getProductList(pageable));
	}

	@ApiResponse(description = "제한한 상품 조회")
	@GetMapping("/banned-product-list/{childId}")
	public ResponseData<Page<ProductInfoDto>> getBannedProductList(
		Pageable pageable,
		@Parameter(description = "상품 ID", required = true) @PathVariable("childId") long childId) {
		return new ResponseData<>("success", "제한한 상품 조회 성공", productService.getBannedProductInfo(childId, pageable));
	}
}
