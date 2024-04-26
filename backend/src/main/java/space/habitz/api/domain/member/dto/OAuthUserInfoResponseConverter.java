package space.habitz.api.domain.member.dto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Map;

public enum OAuthUserInfoResponseConverter {

	KAKAO("kakao") {
		@Override
		public OAuthUserInfoResponse convert(Map<String, Object> response, String providerName) {
			String birthdate = (String) response.get("birthdate");
			return KakaoOidcUserInfoResponseDto.builder()
				.socialId((String) response.get("sub"))
				.email((String) response.get("email"))
				.name((String) response.get("name"))
				.profile((String) response.get("picture"))
				.nickName((String) response.get("nickname"))
				.gender((String) response.get("gender"))
				.birthDate(LocalDate.parse(birthdate, DateTimeFormatter.ISO_DATE))
				.provider(providerName)
				.build();
		}
	};

	private final String provider;

	OAuthUserInfoResponseConverter(String provider) {
		this.provider = provider;
	}

	public static OAuthUserInfoResponse extract(String providerName, Map<String, Object> attributes) {
		return Arrays.stream(values())
			.filter(provider -> providerName.equals(provider.provider))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new)
			.convert(attributes, providerName);
	}

	public abstract OAuthUserInfoResponse convert(Map<String, Object> response, String providerName);
}
