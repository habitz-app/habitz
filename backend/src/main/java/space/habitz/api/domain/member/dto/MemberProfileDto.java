package space.habitz.api.domain.member.dto;

import lombok.Builder;

@Builder
public record MemberProfileDto(
	String name,
	String memberUUID
) {
}
