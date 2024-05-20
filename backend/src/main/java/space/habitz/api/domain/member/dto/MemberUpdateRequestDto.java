package space.habitz.api.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MemberUpdateRequestDto {
    private String nickName;
    private String profileImage;
}
