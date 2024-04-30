package space.habitz.api.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    /**
     * Member
     */
    MEMBER_NOT_FOUND(NOT_FOUND, "찾을 수 없는 회원입니다."),

    /**
     * Child, Parent Authority
     */
    CHILD_CAN_NOT_CREATE_SCHEDULE(UNAUTHORIZED, "아이는 스케줄을 생성할 수 없습니다."),

    /**
     * Schedule
     */
    SCHEDULE_NOT_FOUND(NOT_FOUND, "찾을 수 없는 일정입니다.");

    public final HttpStatus httpStatus;
    public final String errorMessage;
}
