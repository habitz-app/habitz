package space.habitz.api.domain.member.repository;

import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;

import java.util.List;

@Repository
public interface FamilyCustomRepository {
    List<Member> findByFamilyId(String familyId);
}
