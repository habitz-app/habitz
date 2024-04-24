package space.habitz.api.global.util;

import java.util.Random;

public class RandomUtils {
	public static String generateRandomCode(int targetStringLength) {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		Random random = new Random();
		String generatedCode = random.ints(leftLimit, rightLimit + 1)
			.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
			.limit(targetStringLength)
			.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
			.toString();

		return generatedCode;
	}

	public static String generateRandomNumericCode(int targetStringLength) {
		Long l = new Random().nextLong((long) Math.pow(10, targetStringLength));
		String result = String.format("%06d", l);

		return result;
	}
}
