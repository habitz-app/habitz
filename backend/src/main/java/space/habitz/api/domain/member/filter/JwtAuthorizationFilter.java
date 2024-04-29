package space.habitz.api.domain.member.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.exeption.MemberNotFoundException;
import space.habitz.api.domain.member.exeption.MemberUnAuthorizedException;
import space.habitz.api.domain.member.repository.MemberRepository;
import space.habitz.api.domain.member.service.JwtTokenProvider;

import java.io.IOException;

import static space.habitz.api.domain.member.service.JwtTokenProvider.AUTHORIZATION_HEADER;
import static space.habitz.api.domain.member.service.JwtTokenProvider.TOKEN_TYPE;

@RequiredArgsConstructor
@Component
@CrossOrigin
@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {
	private final MemberRepository memberRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationEntryPoint authenticationEntryPoint;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
									FilterChain filterChain) throws ServletException, IOException {
		try {
			log.info("AccessToken 검증시작");
			String auth = request.getHeader(AUTHORIZATION_HEADER);

			log.info("토큰 타입 검증");

			if (auth == null || !auth.startsWith(TOKEN_TYPE)) {
				throw new MemberUnAuthorizedException("유효하지 않은 검증 타입 입니다.");
			}

			String token = auth.replace(TOKEN_TYPE + " ", "");

			log.info("토큰 검증");

			jwtTokenProvider.validateAccessToken(token);

			Long userId = jwtTokenProvider.extractUserId(token);

			log.info("회원 검색");

			Member member = memberRepository.findByUserId(userId)
				.orElseThrow(() -> new MemberNotFoundException(userId));

			log.info("인증 중");
			Authentication authentication = jwtTokenProvider.getAuthentication(member);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			filterChain.doFilter(request, response);
		} catch (AuthenticationException e) {
			log.info("에러 처리");
			authenticationEntryPoint.commence(request, response, e);
		}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		AntPathRequestMatcher[] whiteList = new AntPathRequestMatcher[]{
			new AntPathRequestMatcher("/api/v1/member/login"),
			new AntPathRequestMatcher("/login/oauth2/code/**"),
			new AntPathRequestMatcher("/swagger-ui/**"),
			new AntPathRequestMatcher("/v3/api-docs/**"),
			new AntPathRequestMatcher("/api/v1/test/**"),
		};

		for (AntPathRequestMatcher matcher : whiteList) {
			if (matcher.matches(request)) {
				return true;
			}
		}
		return false;
	}
}
