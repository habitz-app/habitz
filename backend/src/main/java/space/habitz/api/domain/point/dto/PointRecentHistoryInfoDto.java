package space.habitz.api.domain.point.dto;

import java.sql.Timestamp;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Getter;

@Getter
public class PointRecentHistoryInfoDto {
	private Timestamp date;
	private int point;
	private int totalPoint;
	private String content;
	private String emoji;
	private Long missionId;
	private Long productPaymentId;

	@QueryProjection
	public PointRecentHistoryInfoDto(Timestamp date, int point, int totalPoint, String content, String emoji,
		Long missionId, Long productPaymentId) {
		this.date = date;
		this.point = point;
		this.totalPoint = totalPoint;
		this.content = content;
		this.emoji = emoji;
		this.missionId = missionId;
		this.productPaymentId = productPaymentId;
	}
}
