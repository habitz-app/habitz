package space.habitz.api.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

	/**
	 * Schedule
	 */
	SCHEDULE_NOT_FOUND(NOT_FOUND, "Schedule Not Found");

	public final HttpStatus httpStatus;
	public final String errorMessage;
}
