package space.habitz.api.global.util.fileupload.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import space.habitz.api.global.exception.CustomErrorException;
import space.habitz.api.global.exception.ErrorCode;
import space.habitz.api.global.util.fileupload.dto.UploadedFileResponseDto;

@Component
@Slf4j
@RequiredArgsConstructor
public class S3FileUploadService implements FileUploadService {
	@Value("${spring.cloud.aws.s3.bucket}")
	private String bucket;

	private final S3Client s3Client;

	@Override
	public UploadedFileResponseDto uploadFile(MultipartFile file) throws IOException {
		if (file.isEmpty() || Objects.isNull(file.getOriginalFilename())) {
			log.info("file is null");
			throw new CustomErrorException(ErrorCode.AWS_S3_UPLOAD_FAIL);
		}
		validationImageFileExtentions(file.getOriginalFilename()); // 이미지 검증

		String originalFile = getFileName(file);
		String uploadedFile = uploadToS3(file);

		return new UploadedFileResponseDto(originalFile, uploadedFile);
	}

	private String uploadToS3(MultipartFile multipartFile) {
		String s3FileName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();

		try {
			PutObjectRequest putObjectRequest = PutObjectRequest.builder()
				.bucket(bucket)
				.acl(ObjectCannedACL.PUBLIC_READ)
				.contentType(multipartFile.getContentType())
				.contentLength(multipartFile.getSize())
				.key(s3FileName)
				.build();
			RequestBody requestBody = RequestBody.fromBytes(multipartFile.getBytes());
			s3Client.putObject(putObjectRequest, requestBody);
		} catch (IOException e) {
			log.error("cannot upload image", e);
			throw new RuntimeException("파일을 업로드 할 수 없습니다.");
		}

		GetUrlRequest getUrlRequest = GetUrlRequest.builder()
			.bucket(bucket)
			.key(s3FileName)
			.build();

		return s3Client.utilities().getUrl(getUrlRequest).toString();
	}

	private String getFileName(MultipartFile multipartFile) {
		return multipartFile.getOriginalFilename();
	}

	/**
	 * 이미지 파일 여부 검증
	 * @param filename 파일명
	 */
	private void validationImageFileExtentions(String filename) {
		int lastDotIndex = filename.lastIndexOf("."); // 확장자 . 기준
		if (lastDotIndex == -1) {
			throw new CustomErrorException("파일명에 확장자가 없습니다.");
		}

		String fileExtention = filename.substring(lastDotIndex + 1).toLowerCase(); // 검증을 위한 로직
		List<String> imageExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");
		if (!imageExtentionList.contains(fileExtention)) {
			throw new CustomErrorException(ErrorCode.AWS_S3_FILE_NOT_IMAGE);
		}
	}
}
