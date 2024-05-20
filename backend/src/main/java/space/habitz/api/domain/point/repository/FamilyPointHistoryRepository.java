package space.habitz.api.domain.point.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.point.entity.FamilyPointHistory;

public interface FamilyPointHistoryRepository extends JpaRepository<FamilyPointHistory, Long> {
	List<FamilyPointHistory> findFamilyPointHistoriesByFamily_IdAndCreatedAtBetweenOrderByCreatedAtDesc(
		String familyId, LocalDateTime createdAt, LocalDateTime createdAt2);
}
