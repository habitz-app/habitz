export interface CommonResponse<T> {
  data: T;
  message: string;
  status: string;
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

export interface ScheduleResponse {
  scheduleId: number;
  missionId?: number;
}
