package space.habitz.api.domain.article.dto;

import lombok.Builder;
import lombok.Getter;
import space.habitz.api.domain.article.entity.Article;

@Builder
@Getter
public class ArticleInfoDto {
	Long id;
	String title;
	String content;
	String previewImage;
	String writerName;
	String writerImage;
	String source;
	String url;

	public static ArticleInfoDto of(Article article) {
		return ArticleInfoDto.builder()
			.id(article.getId())
			.title(article.getTitle())
			.content(article.getContent())
			.previewImage(article.getImageUrl())
			.writerName(article.getWriterName())
			.writerImage(article.getWriterImage())
			.source(article.getSource())
			.url(article.getUrl())
			.build();
	}
}
