package space.habitz.api.domain.point.service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.exeption.MemberNotFoundException;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.point.dto.PointHistory;
import space.habitz.api.domain.point.dto.PointRecentHistoryDto;
import space.habitz.api.domain.point.dto.PointRecentHistoryInfoDto;
import space.habitz.api.domain.point.repository.ChildPointHistoryRepository;
import space.habitz.api.global.exception.CustomErrorException;

@Service
@RequiredArgsConstructor
public class ChildPointHistoryServiceImpl implements ChildPointHistoryService {

	private final ChildPointHistoryRepository childPointHistoryRepository;
	private final ChildRepository childRepository;
	private final MemberRepository memberRepository;

	private final Map<String, String> emojiMap = new HashMap<String, String>() {{
		put("MISSION", "");
		put("PURCHASE", "💸");
		put("QUIZ", "🧠");
	}};

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
				.totalPoint(childPoint.getTotalPoint())
				.content(childPoint.getContent())
				.date(childPoint.getCreatedAt())
				.build())
			.collect(Collectors.toList());
	}

	private static void validateFamily(Member member, Member child) {
		String childFamilyId = child.getFamily().getId();
		String parentFamilyId = member.getFamily().getId();

		if (!childFamilyId.equals(parentFamilyId)) {
			throw new CustomErrorException("잘못된 값을 요청하였습니다.");
		}
	}

	@Override
	public List<PointHistory> getMonthlyChildPointHistory(Member member, String childUuid, LocalDate startDate,
		LocalDate endDate) {
		Member childMember = memberRepository.findByUuid(childUuid)
			.orElseThrow(() -> new MemberNotFoundException("해당 회원을 찾을 수 없습니다,"));

		validateFamily(member, childMember);

		Child child = childRepository.findByMember_Id(childMember.getId());

		return childPointHistoryRepository.findChildPointHistoriesByChild_IdAndCreatedAtBetweenOrderByCreatedAtDesc(
				child.getId(), Timestamp.valueOf(startDate.atStartOfDay()), Timestamp.valueOf(endDate.atStartOfDay()))
			.stream()
			.map(childPoint -> PointHistory.builder()
				.point(childPoint.getPoint())
				.totalPoint(childPoint.getTotalPoint())
				.content(childPoint.getContent())
				.date(childPoint.getCreatedAt())
				.build())
			.collect(Collectors.toList());
	}

	@Override
	public List<PointRecentHistoryDto> getRecentPointHistory(Member member, String childUuid) {
		Member memChild = memberRepository.findByUuid(childUuid)
			.orElseThrow(() -> new IllegalArgumentException("child not found"));

		if (!Objects.equals(member.getFamily().getId(), memChild.getFamily().getId())) {
			throw new IllegalArgumentException("child not in family");
		}
		Child child = childRepository.findByMember_Id(memChild.getId());
		List<PointRecentHistoryInfoDto> list = childPointHistoryRepository
			.findChildPointHistoriesByChild_Id(child.getId());

		return list
			.stream()
			.map(this::setStatusPointRecentHistory)
			.collect(Collectors.toList());

	}

	public PointRecentHistoryDto setStatusPointRecentHistory(PointRecentHistoryInfoDto pointRecentHistoryInfoDto) {

		String status = getStatus(pointRecentHistoryInfoDto);
		String emoji = status.equals("MISSION") ? pointRecentHistoryInfoDto.getEmoji() : emojiMap.get(status);

		return PointRecentHistoryDto.builder()
			.historyInfo(pointRecentHistoryInfoDto)
			.status(status)
			.emoji(emoji)
			.build();

	}

	String getStatus(PointRecentHistoryInfoDto pointRecentHistoryInfoDto) {

		if (pointRecentHistoryInfoDto.getMissionId() != null) {
			return "MISSION";
		}
		if (pointRecentHistoryInfoDto.getProductPaymentId() != null) {
			return "PURCHASE";
		}
		return "QUIZ";
	}
}
