package space.habitz.api.domain.member.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import space.habitz.api.domain.member.entity.Member;

@Repository
public interface MemberCustomRepository {
	Optional<Member> findBySocialId(String socialId);

	Optional<Member> findByUserId(Long userId);

	Optional<Member> findByUserUUID(String uuid);
}
