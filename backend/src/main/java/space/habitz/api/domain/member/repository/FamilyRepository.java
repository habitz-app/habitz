package space.habitz.api.domain.member.repository;

import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.member.entity.Family;

@Repository @Primary
public interface FamilyRepository extends JpaRepository<Family, String>, FamilyCustomRepository {
	Family findFamilyById(String id);
}
