package space.habitz.api.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.MemberProfile;

import java.util.Optional;

@Repository
public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {
	Optional<MemberProfile> findByMember(Member member);
}
