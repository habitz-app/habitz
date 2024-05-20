package space.habitz.api.domain.product.repository;

import java.util.List;

import com.querydsl.jpa.impl.JPAQuery;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.QChild;
import space.habitz.api.domain.member.entity.QMember;
import space.habitz.api.domain.point.entity.QChildPointHistory;
import space.habitz.api.domain.product.dto.ChildPurchaseInfo;
import space.habitz.api.domain.product.dto.QChildPurchaseInfo;
import space.habitz.api.domain.product.dto.QProductInfoDto;
import space.habitz.api.domain.product.entity.QChildProductPaymentHistory;
import space.habitz.api.domain.product.entity.QProduct;

@RequiredArgsConstructor
public class ChildProductPaymentHistoryCustomRepositoryImpl implements ChildProductPaymentHistoryCustomRepository {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<ChildPurchaseInfo> listChildProductPaymentHistoryByChildId(Long childId) {
		JPAQuery<ChildPurchaseInfo> query = new JPAQuery<>(em);
		QChildProductPaymentHistory childProductPaymentHistory = QChildProductPaymentHistory.childProductPaymentHistory;
		QProduct product = QProduct.product;
		QChildPointHistory childPointHistory = QChildPointHistory.childPointHistory;
		QChild child = QChild.child;
		QMember member = QMember.member;
		return query
			.select(new QChildPurchaseInfo(
				member.uuid,
				childProductPaymentHistory.id,
				childProductPaymentHistory.price,
				childProductPaymentHistory.purchasedAt,
				childPointHistory.totalPoint,
				new QProductInfoDto(
					product.id,
					product.name,
					product.price,
					product.image,
					product.description,
					product.category,
					product.brand
				)
			))
			.from(childProductPaymentHistory)
			.join(childProductPaymentHistory.product, product)
			.leftJoin(childPointHistory)
			.on(childPointHistory.childProductPaymentHistory.id.eq(childProductPaymentHistory.id))
			.join(childProductPaymentHistory.child, child)
			.join(child.member, member)
			.where(childProductPaymentHistory.child.id.eq(childId))
			.orderBy(childProductPaymentHistory.purchasedAt.desc())
			.fetch();
	}

	@Override
	public ChildPurchaseInfo getChildProductPaymentHistoryById(Long productPaymentId) {
		JPAQuery<ChildPurchaseInfo> query = new JPAQuery<>(em);
		QChildProductPaymentHistory childProductPaymentHistory = QChildProductPaymentHistory.childProductPaymentHistory;
		QProduct product = QProduct.product;
		QChildPointHistory childPointHistory = QChildPointHistory.childPointHistory;
		QChild child = QChild.child;
		QMember member = QMember.member;
		List<ChildPurchaseInfo> childPurchaseInfos = query
			.select(new QChildPurchaseInfo(
				member.uuid,
				childProductPaymentHistory.id,
				childProductPaymentHistory.price,
				childProductPaymentHistory.purchasedAt,
				childPointHistory.totalPoint,
				new QProductInfoDto(
					product.id,
					product.name,
					product.price,
					product.image,
					product.description,
					product.category,
					product.brand
				)
			))
			.from(childProductPaymentHistory)
			.join(childProductPaymentHistory.product, product)
			.leftJoin(childPointHistory)
			.on(childPointHistory.childProductPaymentHistory.id.eq(childProductPaymentHistory.id))
			.join(childProductPaymentHistory.child, child)
			.join(child.member, member)
			.where(
				childProductPaymentHistory.id.eq(productPaymentId))
			.orderBy(childProductPaymentHistory.purchasedAt.desc())
			.fetch();
		if (childPurchaseInfos.isEmpty()) {
			throw new IllegalArgumentException("해당하는 상품 구매 내역이 없습니다.");
		}
		return childPurchaseInfos.getFirst();
	}

}
