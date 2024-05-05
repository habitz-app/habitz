package space.habitz.api.domain.article.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.article.dto.ArticleListDto;
import space.habitz.api.domain.article.entity.ArticleCategory;
import space.habitz.api.domain.article.repository.ArticleRepository;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

	private final ArticleRepository articleRepository;

	@Override
	public ArticleListDto getArticleList() {
		return ArticleListDto.builder()
			.lifeCategory(articleRepository.findAllByCategoryOrderByDateDesc(ArticleCategory.LIFE))
			.financeCategory(articleRepository.findAllByCategoryOrderByDateDesc(ArticleCategory.FINANCE))
			.defaultCategory(articleRepository.findAllByCategoryOrderByDateDesc(ArticleCategory.DEFAULT))
			.build();
	}
}
