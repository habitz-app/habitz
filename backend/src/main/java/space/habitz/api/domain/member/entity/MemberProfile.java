package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;
import space.habitz.api.domain.member.dto.OAuthUserInfoResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member_profile")
public class MemberProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_profle_id")
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "gender")
	private String gender;

	@Column(name = "email", length = 100)
	private String email;

	@Column(name = "birth_date")
	private LocalDate birthDate;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;

	public MemberProfile update(OAuthUserInfoResponse response) {
		this.gender = response.getGender();
		this.email = response.getEmail();
		this.birthDate = this.getBirthDate();
		return this;
	}
}
