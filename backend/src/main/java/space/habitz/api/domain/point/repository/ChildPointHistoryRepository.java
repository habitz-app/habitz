package space.habitz.api.domain.point.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.point.entity.ChildPointHistory;

@Repository
public interface ChildPointHistoryRepository
	extends JpaRepository<ChildPointHistory, Long>, ChildPointHistoryCustomRepository {
	List<ChildPointHistory> findChildPointHistoriesByChild_IdAndCreatedAtBetweenOrderByCreatedAtDesc(Long childId,
		LocalDateTime createdAt, LocalDateTime createdAt2);
}
