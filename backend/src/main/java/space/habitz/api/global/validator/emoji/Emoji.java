package space.habitz.api.global.validator.emoji;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;

@Documented
@Constraint(validatedBy = EmojiValidator.class)
@Target({ElementType.ANNOTATION_TYPE, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Emoji {
	String message() default "이모지만 입력 가능합니다.";

	Class<?>[] groups() default {};

	Class<?>[] payload() default {};
}
