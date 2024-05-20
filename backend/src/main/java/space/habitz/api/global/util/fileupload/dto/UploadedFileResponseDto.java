package space.habitz.api.global.util.fileupload.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UploadedFileResponseDto {
	private String originalFile;
	private String saveFile;
}
