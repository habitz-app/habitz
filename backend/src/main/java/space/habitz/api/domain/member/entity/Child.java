package space.habitz.api.domain.member.entity;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Child extends MutableTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	private Member member;

	@Column(name = "point")
	@ColumnDefault("0")
	private Long point;

	public Child(Member member, Long point) {
		this.member = member;
		this.point = point;
	}

	public void setPoint(Long changePoint) {
		this.point += changePoint;
	}
}
