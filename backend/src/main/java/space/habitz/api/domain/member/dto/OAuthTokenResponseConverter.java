package space.habitz.api.domain.member.dto;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public enum OAuthTokenResponseConverter {

	KAKAO("kakao") {
		@Override
		public OAuthTokenResponse convert(Map<String, Object> response, String provider) {
			String scopes = (String) response.get("scope");
			return KakaoOidcTokenResponseDto.builder()
				.idToken((String) response.get("id_token"))
				.accessToken((String) response.get("access_token"))
				.refreshToken((String) response.get("refresh_token"))
				.tokenType((String) response.get("token_type"))
				.scope(List.of(scopes.split(" ")))
				.provider(provider)
				.build();
		}
	};

	private final String provider;

	OAuthTokenResponseConverter(String provider) {
		this.provider = provider;
	}

	public static OAuthTokenResponse extract(String providerName, Map<String, Object> attributes) {
		return Arrays.stream(values())
			.filter(p -> p.provider.equals(providerName))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new)
			.convert(attributes, providerName);
	}


	public abstract OAuthTokenResponse convert(Map<String, Object> response, String provider);
}
