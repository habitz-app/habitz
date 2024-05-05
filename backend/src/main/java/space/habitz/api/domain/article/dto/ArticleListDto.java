package space.habitz.api.domain.article.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ArticleListDto {
	List<ArticleInfoDto> lifeCategory;
	List<ArticleInfoDto> financeCategory;
	List<ArticleInfoDto> defaultCategory;

}
