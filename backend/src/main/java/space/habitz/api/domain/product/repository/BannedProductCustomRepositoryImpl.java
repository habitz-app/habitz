package space.habitz.api.domain.product.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.jpa.impl.JPAQuery;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.QChild;
import space.habitz.api.domain.product.dto.ChildBannedProductInfo;
import space.habitz.api.domain.product.dto.QChildBannedProductInfo;
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

	@Override
	public List<ChildBannedProductInfo> findBannedProductInfo(Member parent, Long productId) {
		JPAQuery<?> query = new JPAQuery<>(em);
		QBannedProduct bannedProduct = QBannedProduct.bannedProduct;
		QChild child = QChild.child;
		return query.select(
				new QChildBannedProductInfo(
					child.member.uuid,
					child.member.name,
					child.member.image,
					bannedProduct.bannedProductID.product.id.isNotNull()
				)
			).from(child)
			.leftJoin(bannedProduct).on(bannedProduct.bannedProductID.child.id.eq(child.id)
				.and(bannedProduct.bannedProductID.product.id.eq(productId)))
			.where(child.member.family.id.eq(parent.getFamily().getId()))
			.fetch();
	}
}
