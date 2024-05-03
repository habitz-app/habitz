package space.habitz.api.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.filter.JwtAuthorizationFilter;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
	private final JwtAuthorizationFilter jwtAuthorizationFilter;
	private final AuthenticationEntryPoint authenticationEntryPoint;
	private final AccessDeniedHandler accessDeniedHandler;

	AntPathRequestMatcher[] whiteList = new AntPathRequestMatcher[] {
		new AntPathRequestMatcher("/api/v1/member/login"),
		new AntPathRequestMatcher("/login/oauth2/code/**"),
		new AntPathRequestMatcher("/swagger-ui/**"),
		new AntPathRequestMatcher("/v3/api-docs/**"),
		new AntPathRequestMatcher("/api/v1/test/**"),
		new AntPathRequestMatcher("/actuator/**")
	};

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(AbstractHttpConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.authorizeHttpRequests((auth) ->
				auth
					.requestMatchers(whiteList).permitAll()
					.anyRequest().authenticated())
			.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling(handler -> {
				handler.authenticationEntryPoint(authenticationEntryPoint);
				handler.accessDeniedHandler(accessDeniedHandler);
			});
		return http.build();
	}
}
