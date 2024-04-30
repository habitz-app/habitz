package space.habitz.api.domain.mission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.habitz.api.domain.mission.entity.Mission;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {
}
