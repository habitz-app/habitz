package space.habitz.api.domain.article.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "date")
	private LocalDate date;

	@Enumerated(EnumType.STRING)
	@Column(name = "category", nullable = false)
	private Category category;

	@Column(name = "url")
	private String url;

	@Column(name = "preview_image")
	private String imageUrl;

	@Column(name = "writer_name")
	private String writerName;

	@Column(name = "writer_image")
	private String writerImage;

	@Column(name = "source")
	private String source;
}
