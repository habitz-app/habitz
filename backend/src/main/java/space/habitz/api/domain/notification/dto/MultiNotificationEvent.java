package space.habitz.api.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import space.habitz.api.domain.member.entity.Member;
import space.habitz.api.domain.notification.entity.NotificationType;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MultiNotificationEvent {
	private NotificationType notificationType;
	private String content;

	@Builder.Default
	private List<Member> targetMemberList = new ArrayList<>();

	public static MultiNotificationEvent createNotification(List<Member> memberList, NotificationType notificationType, String content) {
		return MultiNotificationEvent.builder()
			.notificationType(notificationType)
			.content(content)
			.targetMemberList(memberList)
			.build();
	}



}
