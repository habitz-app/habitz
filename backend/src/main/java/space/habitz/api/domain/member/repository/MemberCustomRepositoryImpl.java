package space.habitz.api.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import space.habitz.api.domain.member.entity.Member;

import java.util.Optional;

import static space.habitz.api.domain.member.entity.QMember.member;
import static space.habitz.api.domain.member.entity.QMemberProfile.memberProfile;
import static space.habitz.api.domain.member.entity.QSocialInform.socialInform;

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
		System.out.println();
		return Optional.ofNullable(findMember);
	}
}
