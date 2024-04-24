package space.habitz.api.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "family")
public class Family extends MutableTimeEntity {

	@Id
	@Column(name = "family_id", length = 10)
	private String id;

	@Column(name = "family_point")
	private Long familyPoint;
}
