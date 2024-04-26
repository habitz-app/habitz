package space.habitz.api.global.exception;

public class CustomErrorException extends RuntimeException {

	public CustomErrorException(String message) {
		super(message);
	}

	public CustomErrorException(String message, Throwable cause) {
		super(message, cause);
	}

	public CustomErrorException(ErrorCode errorCode) {
		super(errorCode.getErrorMessage());
	}
}
