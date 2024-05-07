import { CommonResponse } from './../types/api/response.d';
import useAuthStore from '@/stores/authStore';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = '/api/v1';

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
    (error) => {
      console.error('interceptor > error', error);
      return Promise.reject(error);
    },
  );
};

const createInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 2000,
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
