package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Role;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor
public class FamilyChildListResponseDto {
	private Role memberRole;
	private Long memberId;
	private String name;
	private String profileImage;
	private String uuid;
	private Integer point;

	public static FamilyChildListResponseDto convertToDto(Child child) {
		return FamilyChildListResponseDto.builder()
			.memberId(child.getMember().getId())
			.name(child.getMember().getName())
			.profileImage(child.getMember().getImage())
			.memberRole(child.getMember().getRole())
			.uuid(child.getMember().getUuid())
			.point(child.getPoint())
			.build();
	}
}
