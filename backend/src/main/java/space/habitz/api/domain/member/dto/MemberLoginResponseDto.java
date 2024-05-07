package space.habitz.api.domain.member.dto;

import lombok.*;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class MemberLoginResponseDto {
	private Long userId;
	private String profileImage;
	private String name;
	private String nickName;
	private Role role;
	private JwtResponse jwtResponse;

	public MemberLoginResponseDto(MemberLoginResultDto resultDto) {
		this.userId = resultDto.getUserId();
		this.profileImage = resultDto.getProfileImage();
		this.name = resultDto.getName();
		this.nickName = resultDto.getNickName();
		this.role = resultDto.getRole();
		this.jwtResponse = JwtResponse.builder()
			.accessToken(resultDto.getJwtTokenDto().getAccessToken())
			.accessTokenExpiredIn(resultDto.getJwtTokenDto().getAccessTokenExpiredIn())
			.tokenType(resultDto.getJwtTokenDto().getTokenType())
			.build();
	}

	@Getter
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	private static class JwtResponse{
		private String accessToken;
		private String tokenType;
		private LocalDateTime accessTokenExpiredIn;
	}
}
