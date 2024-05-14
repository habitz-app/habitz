package space.habitz.api.domain.point.dto;

import java.sql.Timestamp;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PointRecentHistoryInfoDto {
	private Timestamp date;
	private int point;
	private int totalPoint;
	private String content;
	private String emoji;
	private Long missionId;
	private Long productId;

	@QueryProjection
	public PointRecentHistoryInfoDto(Timestamp date, int point, int totalPoint, String content, String emoji,
		Long missionId, Long productId) {
		this.date = date;
		this.point = point;
		this.totalPoint = totalPoint;
		this.content = content;
		this.emoji = emoji;
		this.missionId = missionId;
		this.productId = productId;
	}
}
