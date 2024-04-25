package space.habitz.api.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Table(name = "member")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
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

	public Member(Member member) {
		this.id = member.getId();
		this.name = member.getName();
		this.nickname = member.getNickname();
		this.image = member.getImage();
		this.uuid = member.getUuid();
		this.memberProfile = member.getMemberProfile();
		this.socialInform = member.getSocialInform();
		this.role = member.getRole();
	}

	public void setMemberInform(MemberProfile memberProfile, SocialInform socialInform) {
		this.socialInform = socialInform;
		this.memberProfile = memberProfile;
	}

	public Member update(OAuthUserInfoResponse response) {
		this.image = response.getProfile();
		this.name = response.getName();
		this.nickname = response.getNickName();
		return this;
	}
}
