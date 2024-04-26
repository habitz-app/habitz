package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Child extends MutableTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	private Member member;

	@Column(name = "point")
	private Long point;

	public Child(Member member, Long point) {
		this.member = member;
		this.point = point;
	}
}
