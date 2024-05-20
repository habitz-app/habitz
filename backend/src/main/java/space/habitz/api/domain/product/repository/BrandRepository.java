package space.habitz.api.domain.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.product.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
	List<Brand> findByNameIn(List<String> names);
}
