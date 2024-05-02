package space.habitz.api.domain.mission.controller;

import java.time.LocalDate;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
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

	@Operation(
		summary = "미션 삭제",
		description = "미션을 삭제합니다."
	)
	@DeleteMapping("/{missionId}")
	public ResponseData<?> deleteMission(@AuthenticationPrincipal Member member,
		@PathVariable("missionId") Long missionId) {
		return ResponseData.success(missionService.deleteMission(member, missionId));
	}

	@Operation(
		summary = "미션 수정",
		description = "미션을 수정합니다. (일정 수정 X)"
	)
	@PutMapping("/{missionId}")
	public ResponseData<?> updateMission(
		@AuthenticationPrincipal Member member, @PathVariable("missionId") Long missionId,
		@RequestBody UpdateMissionRequestDto requestDto
	) {

		// 미션 수정 실패 로직
		if (requestDto.date().isBefore(LocalDate.now())) {
			return ResponseData.failure("과거 날짜로 미션을 수정할 수 없습니다.");
		}

		return ResponseData.success(missionService.updateMission(member, missionId, requestDto));
	}

}
