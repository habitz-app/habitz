package space.habitz.api.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import space.habitz.api.domain.member.entity.Child;

public interface ChildRepository extends JpaRepository<Child, Long> {
	Optional<Child> findById_AndMember_Family_Id(Long id, String familyId);

	Child findByMember_Id(Long memberId);
}
