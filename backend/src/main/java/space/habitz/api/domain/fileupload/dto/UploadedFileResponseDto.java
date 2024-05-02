package space.habitz.api.domain.fileupload.dto;


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
