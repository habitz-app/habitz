package space.habitz.api.domain.member.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@DiscriminatorValue("Parent")
@PrimaryKeyJoinColumn(name = "member_id")
@AllArgsConstructor
public class Parent extends Member {
	private Long point;

	public Parent(Member member, Long point) {
		super(member);
		this.point = point;
	}
}
