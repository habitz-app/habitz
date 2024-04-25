package space.habitz.api.domain.point.entity;


import jakarta.persistence.*;
import space.habitz.api.domain.member.entity.Child;

@Entity
@Table(name = "child_point_history")
public class ChildPointHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "child_id")
	private Child child;


}
