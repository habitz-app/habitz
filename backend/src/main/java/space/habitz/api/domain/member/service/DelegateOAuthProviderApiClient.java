package space.habitz.api.domain.member.service;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.stereotype.Component;
import space.habitz.api.domain.member.dto.OAuthTokenResponse;
import space.habitz.api.domain.member.entity.Member;

import java.util.Map;

@Component
public class DelegateOAuthProviderApiClient implements OAuthProviderApiClient {
	private final Map<String, OAuthProviderApiClient> apiClient = Map.of(
		"kakao", new KakaoOauthApiClient()
	);

	@Override
	public Map<String, Object> getOAuthToken(String code, ClientRegistration clientRegistration) throws Exception {
		String provider = clientRegistration.getRegistrationId();
		OAuthProviderApiClient oAuthProviderApiClient = apiClient.get(provider);
		return oAuthProviderApiClient.getOAuthToken(code, clientRegistration);
	}

	@Override
	public Map<String, Object> getUserInfo(OAuthTokenResponse request, ClientRegistration clientRegistration) throws Exception {
		String provider = request.getProvider();
		OAuthProviderApiClient oAuthProviderApiClient = apiClient.get(provider);
		return oAuthProviderApiClient.getUserInfo(request, clientRegistration);
	}

	@Override
	public Map<String, Object> logout(Member member, ClientRegistration clientRegistration) throws Exception {
		String provider = member.getSocialInform().getProvider();
		OAuthProviderApiClient oAuthProviderApiClient = apiClient.get(provider);
		return oAuthProviderApiClient.logout(member, clientRegistration);
	}
}
