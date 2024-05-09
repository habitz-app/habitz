package space.habitz.api.domain.point.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.point.entity.FamilyPointHistory;

public interface FamilyPointHistoryRepository extends JpaRepository<FamilyPointHistory, Long> {
	List<FamilyPointHistory> findFamilyPointHistoriesByFamily_IdAndCreatedAtBetweenOrderByCreatedAtDesc(
		String familyId, Timestamp createdAt, Timestamp createdAt2);
}
