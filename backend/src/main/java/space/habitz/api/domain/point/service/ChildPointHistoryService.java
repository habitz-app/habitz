package space.habitz.api.domain.point.service;

import java.util.List;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.point.dto.PointHistory;

public interface ChildPointHistoryService {

	List<PointHistory> getPointHistory(Member member);
}
