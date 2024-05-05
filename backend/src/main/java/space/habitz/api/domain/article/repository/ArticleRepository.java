package space.habitz.api.domain.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import space.habitz.api.domain.article.dto.ArticleInfoDto;
import space.habitz.api.domain.article.entity.Article;
import space.habitz.api.domain.article.entity.ArticleCategory;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
	List<ArticleInfoDto> findAllByCategoryOrderByDateDesc(ArticleCategory category);
}
