package space.habitz.api.domain.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import space.habitz.api.domain.product.entity.BannedProduct;
import space.habitz.api.domain.product.entity.BannedProductID;

@Repository
public interface BannedProductRepository
	extends JpaRepository<BannedProduct, BannedProductID>, BannedProductCustomRepository {

	BannedProduct findByBannedProductID_ProductIdAndBannedProductID_ChildId(Long productId, Long childId);

	Page<BannedProduct> findByBannedProductID_ChildId(Long childId, Pageable pageable);

	List<BannedProduct> findBannedProductsByBannedProductID_ChildId(Long childId);

	@Transactional
	void deleteByBannedProductID_ProductIdAndBannedProductID_ChildId(Long productId, Long childId);

	@Modifying
	@Transactional
	@Query(value = "insert into banned_product (product_id, child_id) values (:productId, :childId)", nativeQuery = true)
	void insertBannedProduct(@Param("productId") Long productId, @Param("childId") Long childId);

}

