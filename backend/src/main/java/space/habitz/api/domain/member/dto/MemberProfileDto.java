package space.habitz.api.domain.member.dto;

import lombok.Builder;
import space.habitz.api.domain.member.entity.Member;

@Builder
public record MemberProfileDto(
	String name,
	String memberUUID,
	String image,
	String nickname
) {
	public static MemberProfileDto of(Member member) {
		return MemberProfileDto.builder()
			.name(member.getName())
			.memberUUID(member.getUuid())
			.image(member.getImage())
			.nickname(member.getNickname())
			.build();
	}
}
