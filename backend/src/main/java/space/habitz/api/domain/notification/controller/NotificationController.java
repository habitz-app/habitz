package space.habitz.api.domain.notification.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.notification.dto.NotificationCountResponseDto;
import space.habitz.api.domain.notification.dto.NotificationRequestDto;
import space.habitz.api.domain.notification.dto.NotificationResponseDto;
import space.habitz.api.domain.notification.service.NotificationService;
import space.habitz.api.global.response.ApiResponseData;

@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {
	private final NotificationService notificationService;

	@GetMapping("")
	public ResponseEntity<?> getNotifications() {
		List<NotificationResponseDto> notification = notificationService.getNotification();
		return ApiResponseData.success(notification);
	}

	@PutMapping("")
	public ResponseEntity<?> readNotification(@RequestBody NotificationRequestDto requestDto) {
		notificationService.updateRead(requestDto.getNotificationId());
		return ApiResponseData.success();
	}

	@DeleteMapping("")
	public ResponseEntity<?> deleteNotifications(@RequestBody NotificationRequestDto requestDto) {
		notificationService.delete(requestDto.getNotificationId());
		return ApiResponseData.success();
	}

	@PutMapping("/read-all")
	public ResponseEntity<?> readAllNotifications(
		@AuthenticationPrincipal Member member
	) {
		notificationService.updateAllRead(member);
		return ApiResponseData.success();
	}

	@GetMapping("/count")
	public ResponseEntity<?> getNotificationCount(
		@AuthenticationPrincipal Member member
	) {
		int count = notificationService.getNotificationCount(member);
		return ApiResponseData.success(NotificationCountResponseDto.builder()
			.count(count)
			.build());
	}

}
