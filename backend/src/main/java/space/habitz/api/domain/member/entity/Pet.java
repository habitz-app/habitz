package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pet")
public class Pet extends MutableTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pet_id")
	private Long id;

	@Column(name = "image")
	private String image;

	@Column(name = "pet_name")
	private String name;

	@Column(name = "experience")
	private Long experience;

}
