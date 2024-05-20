package space.habitz.api.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberCustomRepository {

	Optional<Member> findByUuid(String uuid);
}
