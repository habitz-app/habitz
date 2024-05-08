package space.habitz.api.domain.fileupload.controller;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.fileupload.dto.UploadedFileResponseDto;
import space.habitz.api.domain.fileupload.service.FileUploadService;
import space.habitz.api.global.response.ApiResponseData;

@RestController
@RequestMapping("/api/v1/upload")
@RequiredArgsConstructor
public class UploadController {
	private final FileUploadService uploadService;

	@PostMapping(value = "",
		consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file) throws IOException {
		UploadedFileResponseDto result = uploadService.uploadFile(file);
		return ApiResponseData.success("정상적으로 업로드 되었습니다.", result);
	}

}
