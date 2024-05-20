package space.habitz.api.domain.member.service;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import space.habitz.api.domain.member.dto.OAuthTokenResponse;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;
import space.habitz.api.domain.member.entity.Member;

public interface MemberApiService {
	OAuthTokenResponse getOAuthToken(String code, ClientRegistration clientRegistration) throws Exception;

	OAuthUserInfoResponse getUserInfo(OAuthTokenResponse request, ClientRegistration clientRegistration) throws Exception;

	void logout(Member member, ClientRegistration clientRegistration) throws Exception;
}
