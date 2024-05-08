package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponseDto {
	private String accessToken;
	private String tokenType;
	private LocalDateTime accessTokenExpiredIn;
}
