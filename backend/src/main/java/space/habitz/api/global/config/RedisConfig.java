package space.habitz.api.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;

@Configuration
public class RedisConfig {
	@Value("${spring.data.redis.port}")
	private int port;

	@Value("${spring.data.redis.host}")
	private String host;

	@Value("${spring.data.redis.username}")
	public String userName;

	@Value("${spring.data.redis.password}")
	public String password;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
		redisStandaloneConfiguration.setPort(port);
		redisStandaloneConfiguration.setHostName(host);
		redisStandaloneConfiguration.setUsername(userName);
		redisStandaloneConfiguration.setPassword(password);

		return new LettuceConnectionFactory(redisStandaloneConfiguration);
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connecttionFactory) {
		RedisTemplate<String, Object> template = new RedisTemplate<>();
		template.setKeySerializer(new StringRedisSerializer());
		template.setValueSerializer(new GenericToStringSerializer<Object>(Object.class));
		template.setConnectionFactory(connecttionFactory);
		return template;
	}
}
