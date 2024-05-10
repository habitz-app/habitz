package space.habitz.api.domain.point.service;

import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.point.dto.PointAmount;

public interface PointService {
	PointAmount getPoint(Member member);
}
