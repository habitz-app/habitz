package space.habitz.api.domain.point.service;

import java.time.LocalDate;
import java.util.List;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.point.dto.PointHistory;

public interface FamilyPointHistoryService {
	List<PointHistory> getPointHistory(Member member, LocalDate startDate, LocalDate endDate);
}
