package space.habitz.api.domain.point.repository;

import java.util.List;

import space.habitz.api.domain.point.dto.PointRecentHistoryInfoDto;

public interface ChildPointHistoryCustomRepository {

	List<PointRecentHistoryInfoDto> findChildPointHistoriesByChild_Id(
		Long childId);
}
