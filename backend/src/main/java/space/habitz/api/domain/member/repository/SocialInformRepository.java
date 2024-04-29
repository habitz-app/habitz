package space.habitz.api.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.SocialInform;

import java.util.Optional;

@Repository
public interface SocialInformRepository extends JpaRepository<SocialInform, Long> {
	Optional<SocialInform> findBySocialId(String socialId);
}
