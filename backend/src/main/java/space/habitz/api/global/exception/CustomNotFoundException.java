package space.habitz.api.global.exception;

public class CustomNotFoundException extends RuntimeException {

	public CustomNotFoundException(Long id) {
		super("Entity Not Found with id: " + id);
	}

	public CustomNotFoundException(String message) {
		super(message);
	}

	public CustomNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

}
