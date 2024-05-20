package space.habitz.api.domain.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.product.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findProductById(Long id);

	Page<Product> findProductsByBrandAndCategoryAndIdIsNotIn(String brand, String category, List<Long> productIds,
		Pageable pageable);

	Page<Product> findProductsByBrandAndCategory(String brand, String category, Pageable pageable);

	@Query(value = "SELECT DISTINCT p.brand FROM product p WHERE p.category = :category", nativeQuery = true)
	List<String> findBrandByCategory(@Param("category") String category);
}

