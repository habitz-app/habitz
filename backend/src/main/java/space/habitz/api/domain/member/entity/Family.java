package space.habitz.api.domain.member.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.global.entity.MutableTimeEntity;

import java.time.LocalDateTime;

@Entity
@Table(name = "family")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Family extends MutableTimeEntity {

	@Id
	@Column(name = "family_id", length = 10)
	private String id;

	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime updatedAt;

	@Column(name = "family_point")
	private Long familyPoint;
}
