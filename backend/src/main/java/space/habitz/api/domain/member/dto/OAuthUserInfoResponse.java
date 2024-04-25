package space.habitz.api.domain.member.dto;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.MemberProfile;
import space.habitz.api.domain.member.entity.SocialInform;

import java.time.LocalDate;

public interface OAuthUserInfoResponse {
	String getName();

	String getNickName();

	String getProfile();

	String getEmail();

	LocalDate getBirthDate();

	String getProvider();

	String getSocialId();

	String getGender();

	String getPhoneNumber();

	default SocialInform toSocialInformEntity() {
		return SocialInform.builder()
			.socialId(this.getSocialId())
			.provider(this.getProvider())
			.build();
	}

	default MemberProfile toMemberProfileEntity() {
		return MemberProfile.builder()
			.birthDate(this.getBirthDate())
			.email(this.getEmail())
			.gender(this.getGender())
			.build();
	}

	default Member toMemberEntity(MemberProfile memberProfile, SocialInform socialInform) {
		return Member.builder()
			.image(this.getProfile())
			.nickname(this.getNickName())
			.name(this.getName())
			.memberProfile(memberProfile)
			.socialInform(socialInform)
			.build();
	}

	default Member toMemberEntity() {
		return Member.builder()
			.image(this.getProfile())
			.nickname(this.getNickName())
			.name(this.getName())
			.build();
	}
}
