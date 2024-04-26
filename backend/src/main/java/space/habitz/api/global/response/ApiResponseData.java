package space.habitz.api.global.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ApiResponseData<T> {
	public static <T> ResponseEntity<ResponseData<T>> success(ResponseData<T> data) {
		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> success(String message, T data) {
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseData<>(Response.SUCCESS, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> success(T data) {
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseData<>(Response.SUCCESS, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> success(String message) {
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseData<>(Response.SUCCESS, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> success() {
		return ResponseEntity.status(HttpStatus.OK).body(new ResponseData<>(Response.SUCCESS, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(ResponseData<T> data) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(String message, T data) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.FAILURE, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(T data) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.FAILURE, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(String message) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.FAILURE, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure() {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.FAILURE, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(HttpStatus status, ResponseData<T> data) {
		return ResponseEntity.status(status).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(HttpStatus status, String message, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.FAILURE, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(HttpStatus status, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.FAILURE, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.FAILURE, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> failure(HttpStatus status) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.FAILURE, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(ResponseData<T> data) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(String message, T data) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.EXPIRED, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(T data) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.EXPIRED, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(String message) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.EXPIRED, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.EXPIRED, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(HttpStatus status, ResponseData<T> data) {
		return ResponseEntity.status(status).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(HttpStatus status, String message, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.EXPIRED, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(HttpStatus status, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.EXPIRED, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.EXPIRED, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> expired(HttpStatus status) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.EXPIRED, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(ResponseData<T> data) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> error(String message, T data) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.ERROR, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(T data) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.ERROR, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(String message) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.ERROR, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> error() {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseData<>(Response.ERROR, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(HttpStatus status, ResponseData<T> data) {
		return ResponseEntity.status(status).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> error(HttpStatus status, String message, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.ERROR, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(HttpStatus status, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.ERROR, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.ERROR, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> error(HttpStatus status) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.ERROR, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(ResponseData<T> data) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(String message, T data) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.UNAUTHORIZED, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(T data) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.UNAUTHORIZED, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(String message) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.UNAUTHORIZED, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseData<>(Response.UNAUTHORIZED, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(HttpStatus status, ResponseData<T> data) {
		return ResponseEntity.status(status).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(HttpStatus status, String message, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.UNAUTHORIZED, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(HttpStatus status, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.UNAUTHORIZED, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.UNAUTHORIZED, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> unauthorized(HttpStatus status) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.UNAUTHORIZED, null));
	}


	public static <T> ResponseEntity<ResponseData<T>> serverError(ResponseData<T> data) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(String message, T data) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData<>(Response.SERVER_ERROR, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(T data) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData<>(Response.SERVER_ERROR, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(String message) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData<>(Response.SERVER_ERROR, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError() {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseData<>(Response.SERVER_ERROR, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(HttpStatus status, ResponseData<T> data) {
		return ResponseEntity.status(status).body(data);
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(HttpStatus status, String message, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.SERVER_ERROR, message, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(HttpStatus status, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.SERVER_ERROR, null, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(HttpStatus status, String message) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.SERVER_ERROR, message, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> serverError(HttpStatus status) {
		return ResponseEntity.status(status).body(new ResponseData<>(Response.SERVER_ERROR, null));
	}

	public static <T> ResponseEntity<ResponseData<T>> custom(HttpStatus status, Response response, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(response, data));
	}

	public static <T> ResponseEntity<ResponseData<T>> custom(HttpStatus status, Response response, String message, T data) {
		return ResponseEntity.status(status).body(new ResponseData<>(response, message, data));
	}
}
