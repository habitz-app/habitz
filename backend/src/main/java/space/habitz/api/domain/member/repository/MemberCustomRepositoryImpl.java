package space.habitz.api.domain.member.repository;

import static space.habitz.api.domain.member.entity.QMember.*;
import static space.habitz.api.domain.member.entity.QMemberProfile.*;
import static space.habitz.api.domain.member.entity.QSocialInform.*;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;

@RequiredArgsConstructor
@Repository
public class MemberCustomRepositoryImpl implements MemberCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<Member> findBySocialId(String socialId) {

		Member findMember = jpaQueryFactory.selectFrom(member)
			.innerJoin(member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(member.socialInform, socialInform).fetchJoin()
			.where(member.socialInform.socialId.eq(socialId))
			.where(member.memberProfile.deletedAt.isNull())
			.fetchOne();
		return Optional.ofNullable(findMember);
	}

	@Override
	public Optional<Member> findByUserId(Long userId) {
		Member findMember = jpaQueryFactory.selectFrom(member)
			.innerJoin(member.memberProfile, memberProfile).fetchJoin()
			.innerJoin(member.socialInform, socialInform).fetchJoin()
			.where(member.id.eq(userId))
			.where(member.memberProfile.deletedAt.isNull())
			.fetchOne();

		return Optional.ofNullable(findMember);
	}
}
