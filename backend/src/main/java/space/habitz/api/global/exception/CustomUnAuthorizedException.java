package space.habitz.api.global.exception;

import org.springframework.security.core.AuthenticationException;

public class CustomUnAuthorizedException extends AuthenticationException {

	public CustomUnAuthorizedException(String message) {
		super(message);
	}

	public CustomUnAuthorizedException(String message, Throwable cause) {
		super(message, cause);
	}

}
