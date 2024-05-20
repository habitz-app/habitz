package space.habitz.api.domain.member.exeption;

import space.habitz.api.global.exception.CustomErrorException;

public class MemberAlreadyRegistedException extends CustomErrorException {
	public MemberAlreadyRegistedException(String message) {
		super(message);
	}

	public MemberAlreadyRegistedException(String message, Throwable cause) {
		super(message, cause);
	}
}
