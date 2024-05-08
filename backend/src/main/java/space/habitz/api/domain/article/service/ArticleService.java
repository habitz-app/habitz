package space.habitz.api.domain.article.service;

import space.habitz.api.domain.article.dto.ArticleInfoDto;
import space.habitz.api.domain.article.dto.ArticleListDto;

public interface ArticleService {
	ArticleListDto getArticleList();

	ArticleInfoDto getArticle(Long articleId);
}
