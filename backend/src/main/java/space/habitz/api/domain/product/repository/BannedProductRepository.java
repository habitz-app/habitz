package space.habitz.api.domain.product.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lombok.NonNull;
import space.habitz.api.domain.product.entity.BannedProduct;
import space.habitz.api.domain.product.entity.BannedProductID;

@Repository
public interface BannedProductRepository
	extends JpaRepository<BannedProduct, BannedProductID>, BannedProductCustomRepository {

	BannedProduct findByBannedProductID_ProductIdAndBannedProductID_ChildId(Long productId, Long childId);
}
