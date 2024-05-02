package space.habitz.api.domain.quiz.entity;

import java.sql.Timestamp;

import net.minidev.json.annotate.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Child;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class QuizHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quiz_id")
	private Quiz quiz;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "child_id")
	private Child child;

	@Column(name = "chosen_answer")
	private String chosenAnswer;

	@Column(name = "is_correct")
	private boolean isCorrect;

	@Column(name = "created_at")
	private Timestamp createdAt;

}
