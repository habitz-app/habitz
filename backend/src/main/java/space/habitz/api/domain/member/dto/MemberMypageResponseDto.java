package space.habitz.api.domain.member.dto;

import lombok.*;
import space.habitz.api.domain.member.entity.Member;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberMypageResponseDto {
    private Long userId;
    private String profileImage;
    private String name;
    private String nickName;
    private String email;
    private LocalDate birthDate;
	private String role;
	private String uuid;

    public MemberMypageResponseDto(Member member) {
        this.userId = member.getId();;
        this.profileImage = member.getImage();
        this.name = member.getName();
        this.nickName = member.getNickname();
        this.email = member.getMemberProfile().getEmail();
        this.birthDate = member.getMemberProfile().getBirthDate();
		this.role = member.getRole().getRoleName();
		this.uuid = member.getUuid();
    }
}
