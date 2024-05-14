package space.habitz.api.global.validator.schedule;

import java.time.DayOfWeek;
import java.time.LocalDate;

import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import space.habitz.api.domain.schedule.dto.ScheduleRequestDto;

@Component
public class ScheduleValidator implements ConstraintValidator<ValidSchedule, ScheduleRequestDto> {

	@Override
	public boolean isValid(ScheduleRequestDto requestDto, ConstraintValidatorContext constraintValidatorContext) {

		LocalDate startDate = requestDto.startDate();
		LocalDate endDate = requestDto.endDate();
		Boolean[] repeatDays = requestDto.weekDays();

		if (startDate == null || endDate == null || repeatDays == null) {
			return false;
		}

		if (startDate.equals(endDate)) {
			return true;
		}
		if (startDate.isAfter(endDate)) {
			return false;
		}

		// 다른 날일 경우
		LocalDate date = startDate;
		while (!date.isAfter(endDate)) {
			DayOfWeek dayOfWeek = date.getDayOfWeek();
			int dayIndex = dayOfWeek.getValue() - 1;
			if (repeatDays[dayIndex]) {
				return true;
			}
			date = date.plusDays(1);
		}
		return false;
	}
}
