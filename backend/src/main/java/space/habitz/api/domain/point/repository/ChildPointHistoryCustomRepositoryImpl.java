package space.habitz.api.domain.point.repository;

import java.util.List;

import com.querydsl.jpa.impl.JPAQuery;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import space.habitz.api.domain.mission.entity.QMission;
import space.habitz.api.domain.point.dto.PointRecentHistoryInfoDto;
import space.habitz.api.domain.point.dto.QPointRecentHistoryInfoDto;
import space.habitz.api.domain.point.entity.QChildPointHistory;
import space.habitz.api.domain.product.entity.Product;

public class ChildPointHistoryCustomRepositoryImpl implements ChildPointHistoryCustomRepository {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<PointRecentHistoryInfoDto> findChildPointHistoriesByChild_Id(
		Long childId) {
		JPAQuery<Product> query = new JPAQuery<>(em);

		QChildPointHistory childPointHistory = QChildPointHistory.childPointHistory;
		QMission mission = QMission.mission;
		QPointRecentHistoryInfoDto pointRecentHistoryInfoDto;
		return query.select(
				new QPointRecentHistoryInfoDto(
					childPointHistory.createdAt,
					childPointHistory.point,
					childPointHistory.totalPoint,
					childPointHistory.content,
					mission.emoji,
					childPointHistory.mission.id,
					childPointHistory.childProductPaymentHistory.id
				)
			)
			.from(childPointHistory)
			.leftJoin(childPointHistory.mission, mission)
			.where(childPointHistory.child.id.eq(childId)
				.and(childPointHistory.mission.id.isNull()
					.or(childPointHistory.mission.id.eq(mission.id))))
			.orderBy(childPointHistory.createdAt.desc())
			.limit(10)
			.fetch();
	}
}
