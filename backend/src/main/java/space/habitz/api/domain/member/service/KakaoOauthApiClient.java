package space.habitz.api.domain.member.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import space.habitz.api.domain.member.dto.OAuthTokenResponse;
import space.habitz.api.domain.member.entity.Member;

import java.util.Map;

public class KakaoOauthApiClient implements OAuthProviderApiClient {
	@Value("${spring.security.oauth2.client.provider.kakao.logout-uri}")
	private String logoutUrl;

	@Value("${spring.security.oauth2.client.registration.kakao.adminKey}")
	private String adminKey;

	@Override
	public Map<String, Object> getOAuthToken(String code, ClientRegistration clientRegistration) throws Exception {
		String tokenUri = clientRegistration.getProviderDetails().getTokenUri();
		RestClient restClient = RestClient.builder()
			.baseUrl(tokenUri)
			.build();

		MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
		data.add("grant_type", "authorization_code");
		data.add("client_id", clientRegistration.getClientId());
		data.add("code", code);

		Map<String, Object> result = restClient.post()
			.uri(uriBuilder -> uriBuilder
				.queryParams(data)
				.build())
			.retrieve()
			.body(new ParameterizedTypeReference<Map<String, Object>>() {
			});

		return result;
	}

	@Override
	public Map<String, Object> getUserInfo(OAuthTokenResponse oAuthTokenResponse, ClientRegistration clientRegistration) {
		String userInfoUrl = clientRegistration.getProviderDetails().getUserInfoEndpoint().getUri();

		RestClient restClient = RestClient.builder()
			.baseUrl(userInfoUrl)
			.build();

		String authCode = String.format("%s %s", oAuthTokenResponse.getTokenType(), oAuthTokenResponse.getAccessToken());

		return restClient.get()
			.header("Authorization", authCode)
			.retrieve()
			.body(new ParameterizedTypeReference<Map<String, Object>>() {
			});
	}

	@Override
	public Map<String, Object> logout(Member member, ClientRegistration clientRegistration) throws Exception {
		RestClient restClient = RestClient.builder()
			.baseUrl(logoutUrl)
			.build();

		return restClient.post()
			.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
			.header(HttpHeaders.AUTHORIZATION, "KakaoAK " + adminKey)
			.body(Map.of("target_id_type", "user_id", "target_id", member.getSocialInform().getSocialId()))
			.retrieve()
			.body(new ParameterizedTypeReference<Map<String, Object>>() {
			});
	}
}
