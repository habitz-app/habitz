package space.habitz.api.domain.article.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ArticleInfoDto {
	String title;
	String content;
}
