package space.habitz.api.domain.member.dto;

import lombok.*;
import space.habitz.api.domain.member.entity.Role;

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
	private JwtResponseDto jwtResponse;

	public MemberLoginResponseDto(MemberLoginResultDto resultDto) {
		this.userId = resultDto.getUserId();
		this.profileImage = resultDto.getProfileImage();
		this.name = resultDto.getName();
		this.nickName = resultDto.getNickName();
		this.role = resultDto.getRole();
		this.jwtResponse = JwtResponseDto.builder()
			.accessToken(resultDto.getJwtTokenDto().getAccessToken())
			.accessTokenExpiredIn(resultDto.getJwtTokenDto().getAccessTokenExpiredIn())
			.tokenType(resultDto.getJwtTokenDto().getTokenType())
			.build();
	}


}
