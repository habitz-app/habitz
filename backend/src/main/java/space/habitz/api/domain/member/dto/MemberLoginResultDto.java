package space.habitz.api.domain.member.dto;

import lombok.*;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class MemberLoginResultDto {
	private Long userId;
	private String profileImage;
	private String name;
	private String nickName;
	private Role role;
	private JwtTokenDto jwtTokenDto;

	public MemberLoginResultDto(Member member, JwtTokenDto jwtToken) {
		this.userId = member.getId();
		this.profileImage = member.getImage();
		this.name = member.getName();
		this.nickName = member.getNickname();
		this.role = member.getRole();
		this.jwtTokenDto = jwtToken;
	}
}
