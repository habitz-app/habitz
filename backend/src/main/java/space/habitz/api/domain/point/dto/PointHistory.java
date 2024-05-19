package space.habitz.api.domain.point.dto;

import java.time.LocalDateTime;

import com.querydsl.core.annotations.QueryProjection;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class PointHistory {
	private LocalDateTime date;
	private int point;
	private int totalPoint;
	private String content;
	private String nickname;

	@QueryProjection
	public PointHistory(LocalDateTime date, int point, int remainPoint, String content, String nickname) {
		this.date = date;
		this.point = point;
		this.content = content;
		this.nickname = nickname;
		this.totalPoint = remainPoint;
	}
}
