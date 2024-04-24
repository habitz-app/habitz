package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorColumn
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "member")
public class Member extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(name = "name", length = 30)
	private String name;

	@Column(name = "nickname", length = 30)
	private String nickname;

	@Column(name = "image", length = 255)
	private String image;

	@Column(name = "uuid", length = 10)
	private String uuid;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "member")
	private MemberProfile memberProfile;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "member")
	private SocialInform socialInform;

	@Enumerated(EnumType.STRING)
	private Role role;

	public Member update(OAuthUserInfoResponse response) {
		this.image = response.getProfile();
		this.name = response.getName();
		this.nickname = response.getNickname();
		return this;
	}
}
