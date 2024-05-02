package space.habitz.api.domain.fileupload.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import space.habitz.api.domain.fileupload.dto.UploadedFileResponseDto;
import space.habitz.api.domain.fileupload.service.FileUploadService;
import space.habitz.api.global.response.ApiResponseData;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/upload")
@RequiredArgsConstructor
public class UploadController {
	private final FileUploadService uploadService;

	@PostMapping("")
	public ResponseEntity<?> upload(MultipartFile file) throws IOException {
		UploadedFileResponseDto result = uploadService.uploadFile(file);
		return ApiResponseData.success("정상적으로 업로드 되었습니다.", result);
	}

}
