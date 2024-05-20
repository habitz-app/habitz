package space.habitz.api.domain.schedule.dto;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.entity.Schedule;
import space.habitz.api.global.validator.emoji.Emoji;
import space.habitz.api.global.validator.schedule.ValidSchedule;

@Builder
@ValidSchedule
public record ScheduleRequestDto(
	@Size(max = 64, message = "일정 제목은 64자를 넘을 수 없습니다.")
	String title,
	@Size(max = 255, message = "일정 내용은 255자를 넘을 수 없습니다.")
	String content,
	@Emoji
	String emoji,
	@NotNull(message = "최소 한명 이상의 아이를 선택해야 합니다.")
	@Size(min = 1, message = "최소 한명 이상의 아이를 선택해야 합니다.")
	List<String> childrenUUID,
	LocalDate startDate,
	LocalDate endDate,
	@Size(min = 7, max = 7, message = "요일은 7개여야 합니다.")
	Boolean[] weekDays, // size 7
	Integer point
) implements ScheduleRequest {
	public Schedule toEntity(Member parent, Member child) {

		boolean isRepeatable = !startDate.equals(endDate); // 반복 여부

		// 단일 반복이라면 해당 date에만 요일 true
		if (!isRepeatable) {
			DayOfWeek dayOfWeek = startDate.getDayOfWeek();
			Arrays.fill(weekDays, Boolean.FALSE);
			weekDays[dayOfWeek.getValue() - 1] = Boolean.TRUE;
		}

		return Schedule.builder()
			.title(title)
			.content(content)
			.emoji(emoji)
			.point(point)
			.parent(parent)
			.child(child)
			.startDate(startDate)
			.endDate(endDate)
			.monday(weekDays[0])
			.tuesday(weekDays[1])
			.wednesday(weekDays[2])
			.thursday(weekDays[3])
			.friday(weekDays[4])
			.saturday(weekDays[5])
			.sunday(weekDays[6])
			.repeatable(isRepeatable)
			.build();
	}
}
