package space.habitz.api.domain.quiz.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import space.habitz.api.domain.article.entity.Article;

@Entity
@Getter
@Setter
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "content", nullable = false)
	private String content;
	@Column(name = "answer", nullable = false)
	private String answer;
	@Column(name = "commentary")
	private String commentary;
	@Column(name = "recommended_age")
	private int recommendedAge;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "article_id")
	Article article;
	@Column(name = "date")
	private LocalDate date;

}
