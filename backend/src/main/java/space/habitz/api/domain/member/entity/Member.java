package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member")
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
	private List<FamilyMember> familyMemberList;

	public Member update(OAuthUserInfoResponse response) {
		this.image = response.getProfile();
		this.name = response.getName();
		this.nickname = response.getNickName();
		return this;
	}

	public void setMemberInform(MemberProfile memberProfile, SocialInform socialInform) {
		this.socialInform = socialInform;
		this.memberProfile = memberProfile;
	}
}
