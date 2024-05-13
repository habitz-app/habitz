package space.habitz.api.domain.member.repository;

import static space.habitz.api.domain.member.entity.QChild.*;
import static space.habitz.api.domain.member.entity.QFamily.*;
import static space.habitz.api.domain.member.entity.QMember.*;
import static space.habitz.api.domain.member.entity.QMemberProfile.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Child;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.Role;

@RequiredArgsConstructor
@Repository
public class FamilyCustomRepositoryImpl implements FamilyCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Member> findByFamilyId(String familyId) {
		return jpaQueryFactory.selectFrom(member)
			.innerJoin(member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(member.family, family).fetchJoin()
			.where(family.id.eq(familyId))
			.where(member.memberProfile.deletedAt.isNull())
			.fetch();
	}

	private static OrderSpecifier<LocalDate> orderByChild(boolean isAcs) {
		if (isAcs)
			return member.memberProfile.birthDate.asc();
		return member.memberProfile.birthDate.desc();
	}

	@Override
	public List<Member> findByFamilyIdOnlyChildMember(String familyId, boolean isAcs) {
		return jpaQueryFactory.selectFrom(member)
			.innerJoin(member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(member.family, family).fetchJoin()
			.where(family.id.eq(familyId))
			.where(member.role.eq(Role.CHILD))
			.where(member.memberProfile.deletedAt.isNull())
			.orderBy(orderByChild(isAcs))
			.fetch();
	}

	@Override
	public Optional<Member> findByMemberId(Long id) {
		return findByMemberIds(List.of(id)).stream().findFirst();
	}

	@Override
	public List<Member> findByMemberIds(List<Long> ids) {
		return jpaQueryFactory.selectFrom(member)
			.innerJoin(member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(member.family, family).fetchJoin()
			.where(member.id.in(ids))
			.where(member.memberProfile.deletedAt.isNull())
			.fetch();
	}

	@Override
	public List<Child> findByFamilyIdOnlyChildMember(String familyId) {
		return jpaQueryFactory.selectFrom(child)
			.innerJoin(child.member, member).fetchJoin()
			.innerJoin(child.member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(child.member.family, family).fetchJoin()
			.where(family.id.eq(familyId))
			.where(member.role.eq(Role.CHILD))
			.where(member.memberProfile.deletedAt.isNull())
			.orderBy(orderByChild(true))
			.fetch();
	}

	@Override
	public List<Member> findByFamilyIdOnlyParentMember(String familyId, boolean isAcs) {
		return jpaQueryFactory.selectFrom(member)
			.innerJoin(member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(member.family, family).fetchJoin()
			.where(family.id.eq(familyId))
			.where(member.role.eq(Role.PARENT))
			.where(member.memberProfile.deletedAt.isNull())
			.orderBy(orderByChild(isAcs))
			.fetch();
	}
}
