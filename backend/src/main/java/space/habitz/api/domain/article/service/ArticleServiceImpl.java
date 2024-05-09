package space.habitz.api.domain.article.service;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.article.dto.ArticleInfoDto;
import space.habitz.api.domain.article.dto.ArticleListDto;
import space.habitz.api.domain.article.entity.Article;
import space.habitz.api.domain.article.entity.Category;
import space.habitz.api.domain.article.repository.ArticleRepository;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

	private final ArticleRepository articleRepository;

	@Override
	public ArticleListDto getArticleList() {
		return ArticleListDto.builder()
			.lifeCategory(
				articleRepository.findByCategory(Category.LIFE)
					.stream().map(
						article -> ArticleInfoDto.builder()
							.id(article.getId())
							.title(article.getTitle())
							.content(article.getContent())
							.build()
					).collect(Collectors.toList())

			)
			.financeCategory(
				articleRepository.findByCategory(Category.FINANCE)
					.stream().map(
						article -> ArticleInfoDto.builder()
							.id(article.getId())
							.title(article.getTitle())
							.content(article.getContent())
							.build()
					).collect(Collectors.toList())
			)
			.defaultCategory(
				articleRepository.findByCategory(Category.DEFAULT)
					.stream().map(
						article -> ArticleInfoDto.builder()
							.id(article.getId())
							.title(article.getTitle())
							.content(article.getContent())
							.build()
					).collect(Collectors.toList())
			)
			.build();
	}

	public ArticleInfoDto getArticle(Long articleId) {
		Article article = articleRepository.findArticleById(articleId);
		return ArticleInfoDto.builder()
			.id(article.getId())
			.title(article.getTitle())
			.content(article.getContent())
			.build();
	}
}
