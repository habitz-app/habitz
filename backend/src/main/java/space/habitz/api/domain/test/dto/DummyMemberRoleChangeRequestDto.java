package space.habitz.api.domain.test.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DummyMemberRoleChangeRequestDto {
	private Long memberId;
	private String role;
}
