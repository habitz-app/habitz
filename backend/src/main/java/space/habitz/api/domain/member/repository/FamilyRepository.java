package space.habitz.api.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.member.entity.Family;

@Repository
public interface FamilyRepository extends JpaRepository<Family, String>, FamilyCustomRepository {
	Family findFamilyById(String id);
}
