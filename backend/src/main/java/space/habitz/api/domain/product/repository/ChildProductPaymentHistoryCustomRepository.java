package space.habitz.api.domain.product.repository;

import java.util.List;

import space.habitz.api.domain.product.dto.ChildPurchaseInfo;

public interface ChildProductPaymentHistoryCustomRepository {
	List<ChildPurchaseInfo> listChildProductPaymentHistoryByChildId(Long childId);

	ChildPurchaseInfo getChildProductPaymentHistoryByChildId(Long childId, Long productPaymentId);
}
