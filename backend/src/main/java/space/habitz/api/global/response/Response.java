package space.habitz.api.global.response;

public enum Response {
	SUCCESS("success", "The request has been processed successfully."),
	FAILURE("failure", "The request has failed due to an error in the input or request parameters."),
	EXPIRED("expired", "The request has failed because it has expired or the data is no longer valid."),
	ERROR("error", "An unexpected error occurred while processing the request."),
	UNAUTHORIZED("unauthorized", "Access to the requested resource is forbidden. You do not have the necessary permissions to access this resource."),
	SERVER_ERROR("server error", "An unexpected error occurred while processing the request.");


	private final String status;
	private final String message;

	Response(String status, String message) {
		this.status = status;
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}
}

