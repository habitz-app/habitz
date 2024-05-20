package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class JwtTokenDto {
	private String accessToken;
	private String refreshToken;
	private String tokenType;
	private LocalDateTime accessTokenExpiredIn;
	private LocalDateTime refreshTokenExpiredIn;

}
