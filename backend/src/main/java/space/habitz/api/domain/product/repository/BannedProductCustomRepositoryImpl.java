package space.habitz.api.domain.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.jpa.impl.JPAQuery;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import space.habitz.api.domain.product.entity.Product;
import space.habitz.api.domain.product.entity.QBannedProduct;
import space.habitz.api.domain.product.entity.QProduct;

public class BannedProductCustomRepositoryImpl implements BannedProductCustomRepository {
	@PersistenceContext
	private EntityManager em;

	@Override
	public Page<Product> findProductsByChildId(Long childId, Pageable pageable) {
		JPAQuery<Product> query = new JPAQuery<>(em);
		QProduct product = QProduct.product;
		QBannedProduct bannedProduct = QBannedProduct.bannedProduct;

		List<Product> products = query.select(product)
			.from(bannedProduct)
			.join(bannedProduct.bannedProductID.product, product)
			.where(bannedProduct.bannedProductID.child.id.eq(childId))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		return new PageImpl<>(products, pageable, products.size());
	}
}
