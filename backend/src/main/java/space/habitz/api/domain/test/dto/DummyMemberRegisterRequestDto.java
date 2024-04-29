package space.habitz.api.domain.test.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class DummyMemberRegisterRequestDto {
	private String image;
	private String name;
	private String nickName;
	private LocalDate birthDate;
	private String email;
	private String gender;
	private String role;
}
