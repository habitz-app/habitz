package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class FamilyListResponseDto {
	private Role memberRole;
	private Long memberId;
	private String name;
	private String profileImage;
	private String uuid;

	public static FamilyListResponseDto convertToDto(Member member) {
		return FamilyListResponseDto.builder()
			.memberId(member.getId())
			.name(member.getName())
			.profileImage(member.getImage())
			.memberRole(member.getRole())
			.uuid(member.getUuid())
			.build();
	}
}
