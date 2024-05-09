package space.habitz.api.domain.point.service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.point.dto.PointHistory;
import space.habitz.api.domain.point.repository.ChildPointHistoryRepository;

@Service
@RequiredArgsConstructor
public class ChildPointHistoryServiceImpl implements ChildPointHistoryService {

	private final ChildPointHistoryRepository childPointHistoryRepository;
	private final ChildRepository childRepository;

	@Override
	public List<PointHistory> getPointHistory(Member member, LocalDate startDate, LocalDate endDate) {
		if (member.getRole() != Role.CHILD) {
			throw new IllegalArgumentException("member is not child");
		}
		Child child = childRepository.findByMember_Id(member.getId());

		return childPointHistoryRepository.findChildPointHistoriesByChild_IdAndCreatedAtBetweenOrderByCreatedAtDesc(
				child.getId(), Timestamp.valueOf(startDate.atStartOfDay()), Timestamp.valueOf(endDate.atStartOfDay()))
			.stream()
			.map(childPoint -> PointHistory.builder()
				.point(childPoint.getPoint())
				.point(childPoint.getTotalPoint())
				.content(childPoint.getContent())
				.date(childPoint.getCreatedAt())
				.build())
			.collect(Collectors.toList());
	}
}
