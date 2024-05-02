package space.habitz.api.domain.fileupload.service;

import org.springframework.web.multipart.MultipartFile;
import space.habitz.api.domain.fileupload.dto.UploadedFileResponseDto;

import java.io.IOException;

public interface FileUploadService {
    UploadedFileResponseDto uploadFile(MultipartFile file) throws IOException;
}
