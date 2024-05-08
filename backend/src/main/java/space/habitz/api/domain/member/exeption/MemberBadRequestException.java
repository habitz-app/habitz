package space.habitz.api.domain.member.exeption;

import space.habitz.api.global.exception.CustomErrorException;

public class MemberBadRequestException extends CustomErrorException {
	public MemberBadRequestException(String message) {
		super(message);
	}

	public MemberBadRequestException(String message, Throwable cause) {
		super(message, cause);
	}
}
