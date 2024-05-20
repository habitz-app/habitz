package space.habitz.api.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;

@Repository
public interface FamilyCustomRepository {
	List<Member> findByFamilyId(String familyId);

	List<Member> findByFamilyIdOnlyChildMember(String familyId, boolean isAcs);

	List<Member> findByFamilyIdOnlyParentMember(String familyId, boolean isAcs, Long exclusionMemberId);

	Optional<Member> findByMemberId(Long id);

	List<Member> findByMemberIds(List<Long> ids);

	List<Child> findByFamilyIdOnlyChildMember(String familyId);
}
