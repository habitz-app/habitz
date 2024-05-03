package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;

@AllArgsConstructor
@Builder
@Data
public class FamilyListResponseDto {
	private Role memberRole;
	private Long memberId;
	private String name;
	private String profileImage;

	public static FamilyListResponseDto convertToDto(Member member) {
		return FamilyListResponseDto.builder()
			.memberId(member.getId())
			.name(member.getName())
			.profileImage(member.getImage())
			.memberRole(member.getRole())
			.build();
	}
}
