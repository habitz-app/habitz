package space.habitz.api.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {
	@Value("${swaggerServerUrl}")
	private String serverUrl;

	@Bean
	public OpenAPI api() {
		SecurityScheme apiKey = new SecurityScheme()
			.type(SecurityScheme.Type.APIKEY)
			.in(SecurityScheme.In.HEADER)
			.name("Authorization");

		SecurityRequirement securityRequirement = new SecurityRequirement()
			.addList("Bearer Token");

		Server localServer = new Server();
		localServer.setUrl("http://localhost:8080"); // https://에 접근 가능하게 설정

	 	Server devServer = new Server();
		devServer.setUrl(serverUrl); // https://에 접근 가능하게 설정

		return new OpenAPI()
			.info(apiInfo())
			.servers(List.of(localServer, devServer))
			.components(new Components().addSecuritySchemes("Bearer Token", apiKey))
			.addSecurityItem(securityRequirement);
	}

	private Info apiInfo() {
		return new Info()
			.title("API Test") // API 제목
			.description("Let's practice Swagger UI") // API에 대한 설명
			.version("1.0.0"); // API의 버전
	}
}
