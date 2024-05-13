package space.habitz.api.domain.schedule.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;
import lombok.Builder;
import space.habitz.api.global.validator.schedule.ValidSchedule;

@Builder
@ValidSchedule
public record UpdateScheduleRequestDto(
	@Size(max = 64, message = "일정 제목은 64자를 넘을 수 없습니다.")
	String title,
	@Size(max = 255, message = "일정 내용은 255자를 넘을 수 없습니다.")
	String content,
	String emoji,
	LocalDate startDate,
	LocalDate endDate,
	@Size(min = 7, max = 7, message = "요일은 7개여야 합니다.")
	Boolean[] weekDays,
	Integer point
) {
}
