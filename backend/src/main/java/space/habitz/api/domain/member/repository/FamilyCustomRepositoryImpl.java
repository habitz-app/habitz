package space.habitz.api.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.QMemberProfile;
import space.habitz.api.domain.member.entity.QSocialInform;

import java.util.List;

import static space.habitz.api.domain.member.entity.QFamily.family;
import static space.habitz.api.domain.member.entity.QMember.member;

@RequiredArgsConstructor
@Repository
public class FamilyCustomRepositoryImpl implements FamilyCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<Member> findByFamilyId(String familyId) {
        return jpaQueryFactory.selectFrom(member)
            .innerJoin(member.memberProfile, QMemberProfile.memberProfile).fetchJoin()
            .innerJoin(member.family, family).fetchJoin()
            .where(family.id.eq(familyId))
            .where(member.memberProfile.deletedAt.isNull())
            .fetch();
	}
}
