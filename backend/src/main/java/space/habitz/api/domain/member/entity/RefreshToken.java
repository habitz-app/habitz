package space.habitz.api.domain.member.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@RedisHash(value = "refreshToken")
public class RefreshToken {
	@Id
	private Long memberId;
	private String refreshToken;
	private LocalDateTime createdAt;

	@TimeToLive
	@Value("${jwt.refresh-token.expiration}")
	private Long expiration;

	@Builder
	public RefreshToken(Long memberId, String refreshToken, LocalDateTime createdAt) {
		this.memberId = memberId;
		this.refreshToken = refreshToken;
		this.createdAt = createdAt;
	}
}
