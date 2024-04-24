package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pet_level")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PetLevel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pet_level_id")
	private Long id;

	@Column(name = "level")
	private Long level;

	@Column(name = "min_exp")
	private Long minExp;

	@Column(name = "max_exp")
	private Long maxExp;
}
