package space.habitz.api.domain.member.exeption;

import space.habitz.api.global.exception.CustomNotFoundException;

public class MemberNotFoundException extends CustomNotFoundException {
	public MemberNotFoundException(Long id) {
		super(id);
	}

	public MemberNotFoundException(String message) {
		super(message);
	}

	public MemberNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
