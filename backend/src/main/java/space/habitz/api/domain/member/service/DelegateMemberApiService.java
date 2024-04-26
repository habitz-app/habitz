package space.habitz.api.domain.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.stereotype.Service;
import space.habitz.api.domain.member.dto.OAuthTokenResponse;
import space.habitz.api.domain.member.dto.OAuthTokenResponseConverter;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponseConverter;
import space.habitz.api.domain.member.entity.Member;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class DelegateMemberApiService implements MemberApiService {
	private final OAuthProviderApiClient oAuthProviderApiClient;

	@Override
	public OAuthTokenResponse getOAuthToken(String code, ClientRegistration clientRegistration) throws Exception {
		String provider = clientRegistration.getRegistrationId();
		Map<String, Object> oAuthToken = oAuthProviderApiClient.getOAuthToken(code, clientRegistration);

		return OAuthTokenResponseConverter.extract(provider, oAuthToken);
	}

	@Override
	public OAuthUserInfoResponse getUserInfo(OAuthTokenResponse request, ClientRegistration clientRegistration) throws Exception {
		String provider = request.getProvider();
		Map<String, Object> userInfo = oAuthProviderApiClient.getUserInfo(request, clientRegistration);

		return OAuthUserInfoResponseConverter.extract(provider, userInfo);
	}

	@Override
	public void logout(Member member, ClientRegistration clientRegistration) throws Exception {
		Map<String, Object> userInfo = oAuthProviderApiClient.logout(member, clientRegistration);
	}
}
