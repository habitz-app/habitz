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
  jwtToken: {
    accessToken: string;
    accessTokenExpiredIn: string;
    refreshToken: string;
    refreshTokenExpiredIn: string;
    tokenType: string;
  };
}
