package space.habitz.api.domain.member.repository;

import org.springframework.data.repository.CrudRepository;

import space.habitz.api.domain.member.entity.RefreshToken;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
}
