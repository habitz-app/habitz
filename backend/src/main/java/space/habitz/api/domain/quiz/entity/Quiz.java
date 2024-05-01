package space.habitz.api.domain.quiz.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "title", nullable = false)
	String title;
	@Column(name = "content", nullable = false)
	private String content;
	@Column(name = "answer", nullable = false)
	private String answer;
	@Column(name = "commentary")
	private String commentary;
	@Column(name = "recommended_age")
	private int recommendedAge;
	@Column(name = "date")
	private LocalDate date;

}
