package space.habitz.api.domain.notification.entity;

import space.habitz.api.domain.member.entity.Member;

public enum NotificationType {
	MISSION_SUBMIT {
		@Override
		public String getTitle() {
			return "미션 제출";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님이 미션을 제출했습니다: " + content;
		}
	},
	MISSION_CONFIRM {
		@Override
		public String getTitle() {
			return "미션 확인";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님이 제출한 미션을 확인했습니다: " + content;
		}
	},
	MISSION_REJECT {
		@Override
		public String getTitle() {
			return "미션 거절";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님이 제출한 미션을 거절했습니다: " + content;
		}
	},
	MISSION_APPROVE {
		@Override
		public String getTitle() {
			return "미션 승인";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님이 제출한 미션을 승인했습니다: " + content;
		}
	},
	MISSION_ARRIVED {
		@Override
		public String getTitle() {
			return "미션 도착";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님에게 미션을 부여 했습니다: " + content;
		}
	},
	ITEM_BUYING {
		@Override
		public String getTitle() {
			return "아이템 구매";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님이 아이템을 구매했습니다: " + content;
		}
	},
	POINT_CHARGE {
		@Override
		public String getTitle() {
			return "포인트 충전";
		}

		@Override
		public String getChildContents(String content) {
			return null;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return member.getName() + "님이 포인트를 충전했습니다: " + content;
		}
	},
	SYSTEM {
		@Override
		public String getTitle() {
			return "시스템 알림";
		}

		@Override
		public String getChildContents(String content) {
			return content;
		}

		@Override
		public String getParentContents(Member member, String content) {
			return "시스템 알림: " + content;
		}
	};

	public abstract String getTitle();

	public abstract String getChildContents(String content);

	public abstract String getParentContents(Member member, String content);
}
