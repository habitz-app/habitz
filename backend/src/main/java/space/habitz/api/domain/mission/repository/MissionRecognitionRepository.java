package space.habitz.api.domain.mission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.mission.entity.MissionRecognition;

@Repository
public interface MissionRecognitionRepository extends JpaRepository<MissionRecognition, Long> {
}
