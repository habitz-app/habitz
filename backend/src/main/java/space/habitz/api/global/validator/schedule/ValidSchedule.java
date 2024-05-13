package space.habitz.api.global.validator.schedule;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;

@Documented
@Constraint(validatedBy = ScheduleValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidSchedule {
	String message() default "올바른 스케줄 형식이 아닙니다.";

	Class<?>[] groups() default {};

	Class<?>[] payload() default {};
}
