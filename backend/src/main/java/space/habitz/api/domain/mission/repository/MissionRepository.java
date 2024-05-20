package space.habitz.api.domain.mission.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.mission.entity.Mission;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
	List<Mission> findByChildIdAndDate(Long childId, LocalDate date);

	List<Mission> findByChildIdAndDateBetween(Long childId, LocalDate startDate, LocalDate endDate);

	Optional<Mission> findByScheduleIdAndDate(Long scheduleId, LocalDate date);
}
