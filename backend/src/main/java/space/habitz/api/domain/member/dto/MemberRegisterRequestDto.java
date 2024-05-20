package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberRegisterRequestDto {
	private String familyId;
	private String memberRole;
	private String nickname;
}
