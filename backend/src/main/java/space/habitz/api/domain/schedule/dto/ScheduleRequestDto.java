package space.habitz.api.domain.schedule.dto;

import lombok.Builder;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.schedule.entity.Schedule;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Arrays;

@Builder
public record ScheduleRequestDto(
        String title,
        String content,
        String emoji,
        String childUUID,
        LocalDate startDate,
        LocalDate endDate,
        Boolean[] weekDays, // size 7
        Integer point
) {
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
