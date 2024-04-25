package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.point.entity.ChildPointHistory;

import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("Child")
@PrimaryKeyJoinColumn(name = "member_id")
public class Child extends Member {

	@Column(name = "point")
	private Long point;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "child")
	private List<ChildPointHistory> childPointHistories;
}
