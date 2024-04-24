package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Table(name = "social_inform")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SocialInform extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "social_id")
	private String socialId;

	@Column(name = "provider", length = 10)
	private String provider;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;
}
