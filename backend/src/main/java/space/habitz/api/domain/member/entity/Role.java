package space.habitz.api.domain.member.entity;

import java.util.Arrays;

public enum Role {
	PARENT("ROLE_PARENT"),
	CHILD("ROLE_CHILD"),
	ADMIN("ROLE_ADMIN"),
	GUEST("ROLE_GUEST");

	private final String role;

	public String getRoleName() {
		System.out.println(this.role);
		return this.role.substring(5);
	}

	public static Role findEnum(String target) {
		return Arrays.stream(values())
			.filter(t -> t.getRoleName().equals(target))
			.findFirst()
			.orElseThrow(IllegalArgumentException::new);
	}

	Role(String role) {
		this.role = role;
	}
}
