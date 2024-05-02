package space.habitz.api.domain.mission.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import space.habitz.api.domain.mission.dto.MissionDto;
import space.habitz.api.domain.mission.service.MissionService;
import space.habitz.api.global.response.ResponseData;

@Tag(name = "Mission", description = "미션 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/mission")
public class MissionController {

	private final MissionService missionService;

	@Operation(
		summary = "미션 조회",
		description = "미션 상세 내용을 조회합니다."
	)
	@GetMapping("/{missionId}")
	public ResponseData<MissionDto> getMissionDetail(@PathVariable("missionId") Long missionId) {
		return ResponseData.success(missionService.getMissionDetail(missionId));
	}
}
