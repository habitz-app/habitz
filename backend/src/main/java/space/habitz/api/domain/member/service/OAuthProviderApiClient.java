package space.habitz.api.domain.member.service;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import space.habitz.api.domain.member.dto.OAuthTokenResponse;
import space.habitz.api.domain.member.entity.Member;

import java.util.Map;

public interface OAuthProviderApiClient {
	Map<String, Object> getOAuthToken(String code, ClientRegistration clientRegistration) throws Exception;

	Map<String, Object> getUserInfo(OAuthTokenResponse request, ClientRegistration clientRegistration) throws Exception;

	Map<String, Object> logout(Member member, ClientRegistration clientRegistration) throws Exception;
}
