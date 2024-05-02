package space.habitz.api.domain.member.repository;

import space.habitz.api.domain.member.entity.Child;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {
	Optional<Child> findById_AndMember_Family_Id(Long id, String familyId);

	Child findChildByMember_Id(Long memberId);

}
