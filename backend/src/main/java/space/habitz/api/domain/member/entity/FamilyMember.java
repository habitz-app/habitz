package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family_member")
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
}
