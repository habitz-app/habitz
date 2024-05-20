package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class KakaoOidcUserInfoResponseDto implements OAuthUserInfoResponse {
	private String name;
	private String nickName;
	private String profile;
	private String email;
	private LocalDate birthDate;
	private String provider;
	private String socialId;
	private String gender;
	private String phoneNumber;
}
