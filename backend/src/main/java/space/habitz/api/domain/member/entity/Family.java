package space.habitz.api.domain.member.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family")
public class Family extends MutableTimeEntity {

	@Id
	@Column(name = "family_id", length = 10)
	private String id;

	@Column(name = "family_point")
	private int familyPoint;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "family")
	private List<Member> memberList;

	public Family(String id, int familyPoint) {
		this.id = id;
		this.familyPoint = familyPoint;
	}

	public void addFamilyPoint(int point) {
		this.familyPoint += point;
	}
}
