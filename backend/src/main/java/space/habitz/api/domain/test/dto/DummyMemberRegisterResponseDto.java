package space.habitz.api.domain.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Member;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DummyMemberRegisterResponseDto {
	private Long userId;
	private String image;
	private String name;
	private String nickName;
	private LocalDate birthDate;
	private String email;
	private String gender;
	private String provider;
	private String socialId;
	private String familyId;

	public DummyMemberRegisterResponseDto(Member member) {
		this.userId = member.getId();
		this.image = member.getImage();
		this.name = member.getName();
		this.nickName = member.getNickname();
		this.birthDate = member.getMemberProfile().getBirthDate();
		this.email = member.getMemberProfile().getEmail();
		this.gender = member.getMemberProfile().getGender();
		this.provider = member.getMemberProfile().getGender();
		this.socialId = member.getSocialInform().getSocialId();
		this.familyId = member.getFamily().getId();
	}
}
