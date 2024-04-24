package space.habitz.api.domain.schedule.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import space.habitz.api.global.entity.BaseTimeEntity;
import space.habitz.api.global.entity.MutableTimeEntity;

import java.time.LocalDate;


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

	Long childId;

	Long parentId;

	@Column(name = "repeat_yn")
	Boolean repeatable;
}
