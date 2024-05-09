import { CommonResponse } from './../types/api/response.d';
import useAuthStore from '@/stores/authStore';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = '/api/v1';

export const reissue = async () => {
  console.log('reissuing');
  const accessToken = await axios
    .post(`${API_BASE_URL}/member/reissue`)
    .then((res) => {
      console.log('reissue > res', res.data.data.accessToken);
      return res.data.data.accessToken;
    })
    .catch((error) => {
      console.error('reissue > error', error);
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
    });
  useAuthStore.setState({ accessToken });
  return accessToken;
};

const setInterceptors = (instance: AxiosInstance) => {
  // 서버 요청 전에 동작할 인터셉터 설정
  instance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('interceptor > error', error);
      return Promise.reject(error);
    },
  );

  // 서버 응답 후에 동작할 인터셉터 설정
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error('interceptor > error', error);
      // 401 에러일 경우 토큰 갱신 로직 추가
      if (error.response?.status === 401) {
        // axios로 토큰 갱신
        const newAccessToken = await reissue();

        console.log(newAccessToken);
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return instance(error.config);
      }

      return Promise.reject(error);
    },
  );
};

const createInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
    withCredentials: true,
  });

  setInterceptors(instance);

  return instance;
};

const instance = createInstance();

const client = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<CommonResponse<T>>> =>
    await instance.get(url, config),
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<CommonResponse<T>>> =>
    await instance.post(url, data, config),
  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<CommonResponse<T>>> =>
    await instance.put(url, data, config),
  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<CommonResponse<T>>> =>
    await instance.delete(url, config),
};

export default client;
