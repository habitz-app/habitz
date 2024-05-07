package space.habitz.api.domain.point.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.point.entity.FamilyPointHistory;

public interface FamilyPointHistoryRepository extends JpaRepository<FamilyPointHistory, Long> {
	
}
