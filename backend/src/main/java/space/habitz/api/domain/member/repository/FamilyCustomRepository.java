package space.habitz.api.domain.member.repository;

import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyCustomRepository {
    List<Member> findByFamilyId(String familyId);

	List<Member> findByFamilyIdOnlyChildMember(String familyId, boolean isAcs);

	List<Member> findByFamilyIdOnlyParentMember(String familyId, boolean isAcs);

	Optional<Member> findByMemberId(Long id);

	List<Member> findByMemberIds(List<Long> ids);
}
