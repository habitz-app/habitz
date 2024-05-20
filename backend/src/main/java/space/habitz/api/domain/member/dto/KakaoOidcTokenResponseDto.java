package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KakaoOidcTokenResponseDto implements OAuthTokenResponse {

	private String accessToken;
	private String refreshToken;
	private String tokenType;
	private String idToken;
	private List<String> scope;
	private String provider;

	public String getAccessToken() {
		return accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public String getIdToken() {
		return idToken;
	}

	public List<String> getScope() {
		return scope;
	}

	public String getProvider() {
		return provider;
	}
}
