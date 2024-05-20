package space.habitz.api.global.exception;

import static org.springframework.http.HttpStatus.*;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

	/**
	 * Common
	 * */
	AWS_S3_UPLOAD_FAIL(BAD_REQUEST, "S3 업로드에 실패하였습니다."),
	AWS_S3_FILE_SIZE_EXCEEDED(BAD_REQUEST, "파일 크기가 초과되었습니다."),
	AWS_S3_FILE_NOT_IMAGE(BAD_REQUEST, "이미지 파일이 아닙니다."),

	/**
	 * Member
	 */
	MEMBER_NOT_FOUND(NOT_FOUND, "찾을 수 없는 회원입니다."),

	/**
	 * Family
	 */
	FAMILY_NOT_MATCH(UNAUTHORIZED, "가족 관계가 일치하지 않습니다."),

	/**
	 * Child, Parent Authority
	 */
	CHILD_NOT_FOUND(NOT_FOUND, "찾을 수 없는 아이입니다."),
	CHILD_CAN_NOT_CREATE_SCHEDULE(UNAUTHORIZED, "아이는 스케줄을 생성할 수 없습니다."),

	/**
	 * Schedule
	 */
	SCHEDULE_NOT_FOUND(NOT_FOUND, "찾을 수 없는 일정입니다."),

	/**
	 * Mission
	 */
	MISSION_NOT_FOUND(NOT_FOUND, "찾을 수 없는 미션입니다."),
	MISSION_ACCEPTED_CAN_NOT_DELETE(FORBIDDEN, "수락된 미션은 삭제할 수 없습니다."),
	MISSION_ALREADY_ACCEPTED(FORBIDDEN, "미션은 수락 상태이므로, 상태 변경이 불가합니다."),
	;

	public final HttpStatus httpStatus;
	public final String errorMessage;
}
