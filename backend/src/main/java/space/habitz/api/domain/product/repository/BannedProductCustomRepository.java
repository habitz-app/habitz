package space.habitz.api.domain.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.product.dto.ChildBannedProductInfo;
import space.habitz.api.domain.product.entity.Product;

public interface BannedProductCustomRepository {
	Page<Product> findProductsByChildId(Long childId, Pageable pageable);

	List<ChildBannedProductInfo> findBannedProductInfo(Member parent, Long productId);
}
