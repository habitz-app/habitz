package space.habitz.api.domain.schedule.entity;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.mission.entity.Mission;
import space.habitz.api.domain.schedule.dto.UpdateScheduleRequestDto;
import space.habitz.api.global.entity.MutableTimeEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "schedule")
public class Schedule extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	String emoji;

	@NotNull
	String title;

	String content;

	@NotNull
	int point;

	@NotNull
	LocalDate startDate;

	@NotNull
	LocalDate endDate;

	Boolean monday;

	Boolean tuesday;

	Boolean wednesday;

	Boolean thursday;

	Boolean friday;

	Boolean saturday;

	Boolean sunday;

	@ManyToOne(fetch = FetchType.LAZY)
	Member child;

	@ManyToOne(fetch = FetchType.LAZY)
	Member parent;

	@Column(name = "repeat_yn")
	Boolean repeatable;

	@Column(name = "is_deleted")
	Boolean isDeleted;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "schedule")
	private List<Mission> missionList;

	public void updateSchedule(UpdateScheduleRequestDto request) {

		// Convert List to Column
		LocalDate updateStartDate = request.startDate();
		LocalDate updateEndDate = request.endDate();
		Boolean[] updateWeekDays = request.weekDays();

		boolean isRepeatable = !updateStartDate.equals(updateEndDate); // 반복 여부 확인

		if (!isRepeatable) {
			DayOfWeek dayOfWeek = updateStartDate.getDayOfWeek();
			Arrays.fill(updateWeekDays, Boolean.FALSE);
			updateWeekDays[dayOfWeek.getValue() - 1] = Boolean.TRUE;
		}

		// update
		this.title = request.title();
		this.content = request.content();
		this.emoji = request.emoji();
		this.point = request.point();
		this.startDate = updateStartDate;
		this.endDate = updateEndDate;
		this.monday = updateWeekDays[0];
		this.tuesday = updateWeekDays[1];
		this.wednesday = updateWeekDays[2];
		this.thursday = updateWeekDays[3];
		this.friday = updateWeekDays[4];
		this.saturday = updateWeekDays[5];
		this.sunday = updateWeekDays[6];
		this.repeatable = isRepeatable;

	}
}
