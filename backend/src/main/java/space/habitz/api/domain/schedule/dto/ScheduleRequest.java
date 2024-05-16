package space.habitz.api.domain.schedule.dto;

import java.time.LocalDate;

public interface ScheduleRequest {

	LocalDate startDate();

	LocalDate endDate();

	Boolean[] weekDays();

}
