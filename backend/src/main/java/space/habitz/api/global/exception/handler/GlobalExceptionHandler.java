package space.habitz.api.global.exception.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException e) {
		log.error("GlobalExceptionHandler: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<?> handleNullPointerException(NullPointerException e) {
		log.error("GlobalExceptionHandler: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e) {
		log.error("GlobalExceptionHandler: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ExpiredJwtException.class)
	public ResponseEntity<?> handleExpiredJwtException(Exception e) {
		log.error("GlobalExceptionHandler: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		log.error("GlobalExceptionHandler: " + e.getMessage());
		Map<String, String> errors = new HashMap<>();
		e.getBindingResult().getAllErrors().forEach((error) -> {
			if (error instanceof FieldError) {
				FieldError fieldError = (FieldError)error;
				errors.put(fieldError.getField(), fieldError.getDefaultMessage());
			} else {
				errors.put(error.getObjectName(), error.getDefaultMessage());
			}
		});
		String errorMessage = "입력된 데이터에 오류가 있습니다. 입력 항목을 확인하고 다시 시도하세요.";
		return new ResponseEntity<>(ResponseData.failure(errorMessage, errors), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<?> AccessDeniedException(AccessDeniedException e) {
		log.error("GlobalExceptionHandler: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.unauthorized(), HttpStatus.FORBIDDEN);
	}
}
