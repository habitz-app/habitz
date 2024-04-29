package space.habitz.api.domain.member.repository;

import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;

import java.util.Optional;

@Repository
public interface MemberCustomRepository {
	Optional<Member> findBySocialId(String socialId);

	Optional<Member> findByUserId(Long userId);
}
