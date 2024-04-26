package space.habitz.api.domain.member.dto;

import java.util.List;

public interface OAuthTokenResponse {
	String getAccessToken();

	String getRefreshToken();

	String getTokenType();

	String getIdToken();

	List<String> getScope();

	String getProvider();
}
