package space.habitz.api.global.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;
import space.habitz.api.global.exception.CustomAccessDeniedException;
import space.habitz.api.global.exception.CustomNotFoundException;
import space.habitz.api.global.exception.CustomRestClientException;
import space.habitz.api.global.exception.CustomServerErrorException;
import space.habitz.api.global.exception.CustomUnAuthorizedException;
import space.habitz.api.global.exception.CustomValidationException;
import space.habitz.api.global.response.ResponseData;

@Slf4j
@ControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(CustomNotFoundException.class)
	public ResponseEntity<?> handleCustomNotFoundException(CustomNotFoundException e) {
		log.error("CustomNotFoundException: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.failure(e.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(CustomValidationException.class)
	public ResponseEntity<?> handleCustomValidationException(CustomValidationException e) {
		log.error("CustomValidationException: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.failure(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(CustomServerErrorException.class)
	public ResponseEntity<?> handleCustomServerErrorException(CustomServerErrorException e) {
		log.error("CustomServerErrorException: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(CustomUnAuthorizedException.class)
	public ResponseEntity<?> handleCustomUnAuthorizedException(CustomUnAuthorizedException e) {
		log.error("CustomUnAuthorizedException: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(CustomRestClientException.class)
	public ResponseEntity<?> handleCustomRestClientException(CustomRestClientException e) {
		log.error("CustomRestClientException: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(CustomAccessDeniedException.class)
	public ResponseEntity<?> handleCustomRestClientException(CustomAccessDeniedException e) {
		log.error("CustomRestClientException: " + e.getMessage());
		return new ResponseEntity<>(ResponseData.error(e.getMessage()), HttpStatus.BAD_REQUEST);
	}

}
