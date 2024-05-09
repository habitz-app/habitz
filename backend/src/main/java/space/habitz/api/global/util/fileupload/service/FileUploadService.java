package space.habitz.api.global.util.fileupload.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import space.habitz.api.global.util.fileupload.dto.UploadedFileResponseDto;

public interface FileUploadService {
	UploadedFileResponseDto uploadFile(MultipartFile file) throws IOException;
}
