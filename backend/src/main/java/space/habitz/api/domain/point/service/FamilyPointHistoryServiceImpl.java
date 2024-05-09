package space.habitz.api.domain.point.service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.point.dto.PointHistory;
import space.habitz.api.domain.point.entity.FamilyPointHistory;
import space.habitz.api.domain.point.repository.FamilyPointHistoryRepository;

@Service
@RequiredArgsConstructor
public class FamilyPointHistoryServiceImpl implements FamilyPointHistoryService {

	private final FamilyPointHistoryRepository familyPointHistoryRepository;
	private final MemberRepository memberRepository;

	@Override
	public List<PointHistory> getPointHistory(Member member, LocalDate startDate, LocalDate endDate) {
		String familyId = member.getFamily().getId();

		List<FamilyPointHistory> familyPointHistories = familyPointHistoryRepository.findFamilyPointHistoriesByFamily_IdAndCreatedAtBetweenOrderByCreatedAtDesc(
			familyId,
			Timestamp.valueOf(startDate.atStartOfDay()), Timestamp.valueOf(endDate.atStartOfDay()));

		return familyPointHistories.stream()
			.map(familyPoint -> PointHistory.builder()
				.nickname(familyPoint.getMember().getNickname())
				.totalPoint(familyPoint.getTotalPoint())
				.point(familyPoint.getPayPoint())
				.content(familyPoint.getContent())
				.date(familyPoint.getCreatedAt())
				.build())
			.collect(Collectors.toList());

	}
}
