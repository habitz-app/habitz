package space.habitz.api.domain.article.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lombok.NonNull;
import space.habitz.api.domain.article.entity.Article;
import space.habitz.api.domain.article.entity.Category;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
	@NonNull List<Article> findByCategory(@NonNull Category category);
}
