package space.habitz.api.domain.point.service;

import java.time.LocalDate;
import java.util.List;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.point.dto.PointHistory;
import space.habitz.api.domain.point.dto.PointRecentHistoryDto;

public interface ChildPointHistoryService {
	List<PointHistory> getPointHistory(Member member, LocalDate startDate, LocalDate endDate);

	List<PointHistory> getMonthlyChildPointHistory(Member member, String childUuid, LocalDate startDate,
		LocalDate endDate);

	List<PointRecentHistoryDto> getRecentPointHistory(Member member, String childUuid);
}
