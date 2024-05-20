package space.habitz.api.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.member.entity.MemberProfile;

@Repository
public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {
}
