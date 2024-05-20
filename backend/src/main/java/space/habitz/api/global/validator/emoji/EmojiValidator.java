package space.habitz.api.global.validator.emoji;

import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class EmojiValidator implements ConstraintValidator<Emoji, String> {
	@Override
	public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
		if (value == null || value.isEmpty()) {
			return true; // null or empty values are valid
		}

		return value.codePoints().allMatch(codePoint ->
			(codePoint >= 0x1F600 && codePoint <= 0x1F64F) ||  // Emoticons
				(codePoint >= 0x1F300 && codePoint <= 0x1F5FF) ||  // Miscellaneous Symbols and Pictographs
				(codePoint >= 0x1F680 && codePoint <= 0x1F6FF) ||  // Transport and Map Symbols
				(codePoint >= 0x1F700 && codePoint <= 0x1F77F) ||  // Alchemical Symbols
				(codePoint >= 0x1F780 && codePoint <= 0x1F7FF) ||  // Geometric Shapes Extended
				(codePoint >= 0x1F800 && codePoint <= 0x1F8FF) ||  // Supplemental Arrows-C
				(codePoint >= 0x1F900 && codePoint <= 0x1F9FF) ||  // Supplemental Symbols and Pictographs
				(codePoint >= 0x1FA00 && codePoint <= 0x1FA6F) ||  // Chess Symbols
				(codePoint >= 0x1FA70 && codePoint <= 0x1FAFF)    // Symbols and Pictographs Extended-A
		);
	}
}
