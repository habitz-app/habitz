package space.habitz.api.global.exception;

import java.io.IOException;

public class CustomRestClientException extends IOException {
	public CustomRestClientException() {
	}

	public CustomRestClientException(String message) {
		super(message);
	}

	public CustomRestClientException(String message, Throwable cause) {
		super(message, cause);
	}

	public CustomRestClientException(Throwable cause) {
		super(cause);
	}
}
