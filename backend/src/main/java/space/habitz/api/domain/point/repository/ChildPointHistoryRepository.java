package space.habitz.api.domain.point.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.point.entity.ChildPointHistory;

@Repository
public interface ChildPointHistoryRepository extends JpaRepository<ChildPointHistory, Long>{
	List<ChildPointHistory> findChildPointHistoriesByChild_IdOrderByCreatedAtDesc(Long childId);
}
