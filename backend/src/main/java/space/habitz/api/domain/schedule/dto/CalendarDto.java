package space.habitz.api.domain.schedule.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import space.habitz.api.domain.member.dto.MemberProfileDto;

@Builder
public record CalendarDto(
	MemberProfileDto child,
	List<LocalDate> days
) {
}
