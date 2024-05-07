package space.habitz.api.domain.point.dto;


import java.sql.Timestamp;

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
	private Timestamp date;
	private int point;
	private String content;

	@QueryProjection
	public PointHistory(Timestamp date, int point, String content) {
		this.date = date;
		this.point = point;
		this.content = content;
	}
}
