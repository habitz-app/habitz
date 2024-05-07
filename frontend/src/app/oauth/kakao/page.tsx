'use client';

import axios from '@/apis/axios';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';
import { KakaoLoginResponse } from '@/types/api/response';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const KakaoLoginPage = () => {
  const [status, setStatus] = useState('loading');
  const params = useSearchParams();
  const setAccessToken = useAuthStore.use.setAccessToken();
  const setUser = useUserStore.use.setUser();
  const router = useRouter();

  const handleKakaoLogin = useCallback(
    async (code: string | string[]) => {
      const response = await axios.post<KakaoLoginResponse>('/member/login', {
        code: code,
        provider: 'kakao',
      });

      if (response?.status !== 200) {
        setStatus('error');
        return;
      }

      console.log(response);

      const { jwtResponse, ...user } = response.data.data;

      setUser(user);
      setAccessToken(jwtResponse.accessToken);

      window.Kakao.Auth.setAccessToken(jwtResponse.accessToken);

      setStatus('done');
    },
    [setAccessToken, setUser],
  );

  useEffect(() => {
    if (status === 'done') {
      router.push('/');
    }
  }, [router, status]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SDK_KEY);
      }
    }

    const code = params.get('code');

    if (code) handleKakaoLogin(code);
  }, [params, handleKakaoLogin]);

  return <>{status === 'loading' && <div>Loading...</div>}</>;
};

export default KakaoLoginPage;
