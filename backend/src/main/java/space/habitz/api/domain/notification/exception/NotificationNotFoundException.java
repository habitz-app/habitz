package space.habitz.api.domain.notification.exception;

import space.habitz.api.global.exception.CustomNotFoundException;
import space.habitz.api.global.exception.ErrorCode;

public class NotificationNotFoundException extends CustomNotFoundException {
	public NotificationNotFoundException(Long id) {
		super(id);
	}

	public NotificationNotFoundException(String message) {
		super(message);
	}

	public NotificationNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public NotificationNotFoundException(ErrorCode errorCode) {
		super(errorCode);
	}
}
