package space.habitz.api.global.exception;

import org.springframework.security.access.AccessDeniedException;

public class CustomAccessDeniedException extends AccessDeniedException {
	public CustomAccessDeniedException(String msg) {
		super(msg);
	}

	public CustomAccessDeniedException(String message, Throwable cause) {
		super(message, cause);
	}
}
