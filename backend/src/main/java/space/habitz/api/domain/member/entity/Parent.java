package space.habitz.api.domain.member.entity;

import org.hibernate.annotations.SQLRestriction;

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
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("is_deleted = 0")
public class Parent extends MutableTimeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	Member member;

	private int point;

	@Column(name = "is_deleted")
	private boolean isDeleted = Boolean.FALSE;

	public void setDeleted() {
		isDeleted = true;
	}

	public void setUndeleted() {
		isDeleted = false;
	}

	public Parent(Member member, int point) {
		this.member = member;
		this.point = point;
	}
}
