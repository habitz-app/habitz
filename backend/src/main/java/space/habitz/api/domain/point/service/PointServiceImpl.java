package space.habitz.api.domain.point.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;
import space.habitz.api.domain.member.repository.ChildRepository;
import space.habitz.api.domain.member.repository.FamilyRepository;
import space.habitz.api.domain.point.dto.PointAmount;
import space.habitz.api.global.exception.CustomAccessDeniedException;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {
	private final ChildRepository childRepository;
	private final FamilyRepository familyRepository;

	@Override
	public PointAmount getPoint(Member member) {
		if (member.getRole() == Role.CHILD) {
			return PointAmount.builder()
				.point(childRepository.findByMember_Id(member.getId()).getPoint())
				.isFamilyPoint(false)
				.build();
		} else if (member.getRole() == Role.PARENT) {
			return PointAmount.builder()
				.point(familyRepository.findFamilyById(member.getFamily().getId()).getFamilyPoint())
				.isFamilyPoint(true)
				.build();
		} else {
			throw new CustomAccessDeniedException("접근 권한이 없습니다.");
		}
	}
}
