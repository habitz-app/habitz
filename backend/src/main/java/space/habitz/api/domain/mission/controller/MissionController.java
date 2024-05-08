package space.habitz.api.domain.mission.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.mission.dto.MissionApproveRequestDto;
import space.habitz.api.domain.mission.dto.MissionDto;
import space.habitz.api.domain.mission.dto.UpdateMissionRequestDto;
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

	@Operation(
		summary = "날짜를 기준으로 미션 리스트 조회 (아이)",
		description = "아이는 날짜를 기준으로 미션 목록을 조회합니다."
	)
	@GetMapping("/list")
	public ResponseData<List<MissionDto>> getMissionList(
		@AuthenticationPrincipal Member member,
		@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		return ResponseData.success(missionService.getMissionList(member, date));
	}

	@Operation(
		summary = "날짜를 기준으로 아이들에 대한 미션 리스트 조회 (부모)",
		description = "부모는 날짜를 기준으로 아이의 미션 목록을 조회합니다. <br> child 값은 memberUUID 를 사용합니다. <br> child는 nullable 하며, null일 경우 전체 아이들의 목록 / null이 아닐 경우 특정 아이에 대한 목록을 조회합니다."
	)
	@GetMapping("/children/list")
	public ResponseData<?> getChildrenMissionList(
		@AuthenticationPrincipal Member member,
		@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
		@RequestParam(name = "child", required = false) String childUUID
	) {
		if (childUUID == null) {
			// 전체 아이의 미션 목록 조회
			return ResponseData.success(missionService.getChildrenMissionList(member, date));
		} else {
			// 특정 아이의 미션 목록 조회
			return ResponseData.success(missionService.getChildMissionList(member, childUUID, date));
		}
	}

	@PostMapping("/approve")
	public ResponseData<?> approveMission(
		@AuthenticationPrincipal Member member,
		@RequestBody MissionApproveRequestDto requestDto
	) {
		return ResponseData.success(
			missionService.changeMissionStatus(member, requestDto.missionId(), requestDto.status()));
	}

}
