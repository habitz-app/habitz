package space.habitz.api.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;

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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "family_id")
	private Family family;

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
