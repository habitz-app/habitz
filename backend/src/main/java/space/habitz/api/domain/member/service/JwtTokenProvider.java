package space.habitz.api.domain.member.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import space.habitz.api.domain.member.dto.JwtTokenDto;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.member.entity.RefreshToken;
import space.habitz.api.domain.member.exeption.MemberUnAuthorizedException;
import space.habitz.api.domain.utils.AuthUtils;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;


@Component
@Slf4j
public class JwtTokenProvider {
	public static final String AUTHORIZATION_HEADER = "Authorization";
	public static final String TOKEN_TYPE = "Bearer";
	private static final String TYPE_ACCESS = "access";
	private static final String TYPE_REFRESH = "refresh";

	@Value("${jwt.secret-key}")
	private String secretKey;

	@Value("${jwt.access-token.expiration}")
	private long accessTokenExpiration;

	@Value("${jwt.refresh-token.expiration}")
	private long refreshTokenExpiration;

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	public JwtTokenDto generateToken(Member member) {
		String accessToken = generateAccessToken(member);
		String refreshToken = generateRefreshToken(member);
		LocalDateTime accessTokenExpiredIn = getTokenExpirationTime(accessToken);
		LocalDateTime refreshTokenExpiredIn = getTokenExpirationTime(refreshToken);
		return new JwtTokenDto(accessToken, refreshToken, TOKEN_TYPE, accessTokenExpiredIn, refreshTokenExpiredIn);
	}

	public RefreshToken toRefreshToken(Member member, JwtTokenDto jwtToken) {
		return new RefreshToken(member.getId(), jwtToken.getRefreshToken(), jwtToken.getRefreshTokenExpiredIn());
	}

	private LocalDateTime getTokenExpirationTime(String token) {
		Date date = extractExpiration(token);
		return date.toInstant()
			.atZone(ZoneId.systemDefault())
			.toLocalDateTime();
	}

	public boolean validateAccessToken(String token) {
		String tokenType = extractTokenType(token);

		if (!validateTokenType(tokenType, TYPE_ACCESS))
			throw new MemberUnAuthorizedException("AccessToken 값이 아닙니다.");

		return validateToken(token);
	}

	public boolean validateRefreshToken(String token) {
		String tokenType = extractTokenType(token);

		if (!validateTokenType(tokenType, TYPE_REFRESH))
			throw new MemberUnAuthorizedException("RefreshToken 값이 아닙니다.");

		return isSameUser(token) && validateToken(token);
	}

	private static boolean validateTokenType(String token, String type) {
		return token.equals(type);
	}

	private boolean isSameUser(String token) {
		Long authenticatedUserId = AuthUtils.getAuthenticatedUserId();
		Long userId = extractUserId(token);

		return authenticatedUserId.equals(userId);
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token", e);
			throw new MemberUnAuthorizedException("유효하지 않은 토큰 입니다.");
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token", e);
			throw new MemberUnAuthorizedException("토큰의 만료 되었습니다.");
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token", e);
			throw new MemberUnAuthorizedException("지원하지 않는 토큰 입니다.");
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty.", e);
			throw new MemberUnAuthorizedException("유효하지 않는 값을 입력 했습니다.");
		}
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public Long extractUserId(String token) {
		return extractClaim(token, (c) -> c.get("id", Long.class));
	}

	public String extractTokenType(String token) {
		return extractClaim(token, (c) -> c.get("type", String.class));
	}

	public String extractRole(String token) {
		return extractClaim(token, (c) -> c.get("role", String.class));
	}

	public String generateAccessToken(Member member) {
		HashMap<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("id", member.getId());
		extraClaims.put("type", TYPE_ACCESS);
		return buildToken(extraClaims, accessTokenExpiration);
	}

	public String generateRefreshToken(Member member) {
		HashMap<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("id", member.getId());
		extraClaims.put("type", TYPE_REFRESH);
		return buildToken(extraClaims, refreshTokenExpiration);
	}

	public Authentication getAuthentication(Member member) {
		return new UsernamePasswordAuthenticationToken(member, "",
			List.of(new SimpleGrantedAuthority("ROLE_" + member.getRole().getRoleName())));
	}

	private String buildToken(Map<String, Object> extraClaims, long expiration) {
		Date currentTime = new Date(System.currentTimeMillis());
		Date expiredTime = new Date(System.currentTimeMillis() + expiration);

		return Jwts.builder()
			.setClaims(extraClaims)
			.setIssuedAt(currentTime)
			.setExpiration(expiredTime)
			.signWith(getSignInKey(), SignatureAlgorithm.HS256)
			.compact();
	}

	private Claims extractAllClaims(String token) {
		try {
			return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
		} catch (SecurityException | MalformedJwtException e) {
			log.info("Invalid JWT Token", e);
			throw new MemberUnAuthorizedException("유효하지 않은 토큰 입니다.");
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT Token", e);
			throw new MemberUnAuthorizedException("토큰의 만료 되었습니다.");
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT Token", e);
			throw new MemberUnAuthorizedException("지원하지 않는 토큰 입니다.");
		} catch (IllegalArgumentException e) {
			log.info("JWT claims string is empty.", e);
			throw new MemberUnAuthorizedException("유효하지 않는 값을 입력 했습니다.");
		}
	}

	private Key getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
