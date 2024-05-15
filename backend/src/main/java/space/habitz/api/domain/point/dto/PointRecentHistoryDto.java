package space.habitz.api.domain.point.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
public class PointRecentHistoryDto {
	String status;
	String emoji;
	PointRecentHistoryInfoDto historyInfo;
}
