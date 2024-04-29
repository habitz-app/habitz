package space.habitz.api.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.SocialInform;

import java.util.Optional;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberCustomRepository {
	Optional<Member> findBySocialInform(SocialInform socialInform);
}
