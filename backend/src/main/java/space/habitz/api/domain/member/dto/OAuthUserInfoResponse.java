package space.habitz.api.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class OAuthUserInfoResponse {
	String profile;

	String name;

	String gender;

	String email;

	LocalDate birthDate;

	String nickname;
}
