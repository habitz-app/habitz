package space.habitz.api.domain.member.exeption;

import space.habitz.api.global.exception.CustomUnAuthorizedException;

public class MemberUnAuthorizedException extends CustomUnAuthorizedException {
	public MemberUnAuthorizedException(String message) {
		super(message);
	}

	public MemberUnAuthorizedException(String message, Throwable cause) {
		super(message, cause);
	}
}
