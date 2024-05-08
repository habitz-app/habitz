package space.habitz.api.domain.article.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.article.dto.ArticleInfoDto;
import space.habitz.api.domain.article.dto.ArticleListDto;
import space.habitz.api.domain.article.service.ArticleService;
import space.habitz.api.global.response.ResponseData;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/article")
public class ArticleController {

	private final ArticleService articleService;

	@GetMapping("/list")
	public ResponseData<ArticleListDto> getArticleList() {
		return ResponseData.success(articleService.getArticleList());
	}

	@GetMapping("/{articleId}")
	public ResponseData<ArticleInfoDto> getArticle(
		@PathVariable("articleId") Long articleId) {
		return ResponseData.success(articleService.getArticle(articleId));
	}

}
