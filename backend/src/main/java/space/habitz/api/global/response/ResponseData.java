package space.habitz.api.global.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseData<T> {
	private String status;
	private String message;
	private T data;

	public ResponseData(Response response, T data) {
		this.status = response.getStatus();
		this.message = response.getMessage();
		this.data = data;
	}

	public ResponseData(Response response, String message, T data) {
		this.status = response.getStatus();
		this.message = message;
		this.data = data;
	}


	public static <T> ResponseData<T> success(T data) {
		return new ResponseData<>(Response.SUCCESS, data);
	}

	public static <T> ResponseData<T> success(String message, T data) {
		return new ResponseData<>(Response.SUCCESS, message, data);
	}

	public static <T> ResponseData<T> failure() {
		return new ResponseData<>(Response.FAILURE, null);
	}

	public static <T> ResponseData<T> failure(String message) {
		return new ResponseData<>(Response.FAILURE, message, null);
	}

	public static <T> ResponseData<T> expired() {
		return new ResponseData<>(Response.EXPIRED, null);
	}

	public static <T> ResponseData<T> expired(String message) {
		return new ResponseData<>(Response.EXPIRED, message, null);
	}

	public static <T> ResponseData<T> error() {
		return new ResponseData<>(Response.ERROR, null);
	}

	public static <T> ResponseData<T> error(String message) {
		return new ResponseData<>(Response.ERROR, message, null);
	}

	public static <T> ResponseData<T> unauthorized() {
		return new ResponseData<>(Response.UNAUTHORIZED, null);
	}

	public static <T> ResponseData<T> unauthorized(String message) {
		return new ResponseData<>(Response.UNAUTHORIZED, message, null);
	}

	public static <T> ResponseData<T> serverError() {
		return new ResponseData<>(Response.SERVER_ERROR, null);
	}

	public static <T> ResponseData<T> serverError(String message) {
		return new ResponseData<>(Response.SERVER_ERROR, message, null);
	}

	public static <T> ResponseData<T> custom(String status, String message, T data) {
		return new ResponseData<>(status, message, data);
	}

}
