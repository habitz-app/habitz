export interface CommonResponse<T> {
  data: T;
  message: string;
  status: string;
}

export interface QuizResponse {
  isSolved: boolean;
  quizInfoDto: {
    id: number;
    content: string;
    createdAt: string;
  };
  quizHistoryInfoDto: {
    chosenAnswer: string;
    createdAt: string;
    correct: boolean;
  };
}

export interface KakaoLoginResponse {
  userId: number;
  name: string;
  nickName: string;
  profileImage: string;
  role: string;
  jwtResponse: {
    accessToken: string;
    accessTokenExpiredIn: string;
    tokenType: string;
  };
}

export interface MemberResponse {
  userId: number;
  profileImage: string;
  name: string;
  nickName: string;
  email: string;
  birthDate: string;
  uuid: string;
  role: string;
}

export interface ScheduleResponse {
  scheduleId: number;
  missionId?: number;
}

export interface CalendarResponse {
  month: string;
  calendar: {
    child: { name: string; memberUUID: string };
    days: string[];
  }[];
}

export interface ChildListResponse {
  memberRole: 'CHILD' | 'PARENT';
  memberId: number;
  name: string;
  uuid: string;
  profileImage: string;
}

export interface TestCreateChildResponse {
  userId: number;
  name: string;
  profileImage: string;
  nickName: string;
  role: string;
  jwtTokenDto: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    accessTokenExpiredIn: string;
    refreshTokenExpiredIn: string;
  };
}

export interface FamilyMemberListResponse {}

export interface OrderResponse {
  orderId: string;
  memberUuid: string;
  amount: number;
}

export interface ArticleInfo {
  id: number;
  title: string;
  content: string;
}
export interface ArticleResponse {
  lifeCategory: ArticleInfo[];
  financeCategory: ArticleInfo[];
  defaultCategory: ArticleInfo[];
}

export interface QuizResponse {
  isSolved: boolean;
  quizInfo: {
    id: number;
    content: string;
    createdAt: string;
  };
  quizHistoryInfo: {
    articleId: number;
    chosenAnswer: string;
    createdAt: string;
    correct: true;
  };
}
