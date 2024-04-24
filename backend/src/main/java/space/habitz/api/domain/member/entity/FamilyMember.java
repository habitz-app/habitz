package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Table(name = "family_member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FamilyMember extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long familyMemberId;

	@ManyToOne
	@JoinColumn(name = "family_id", nullable = false)
	private Family family;

	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	public FamilyMember(Family family, Member member) {
		this.family = family;
		this.member = member;
	}
}
