'use client';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import axios from '@/apis/axios';
import { useCallback, useEffect, useState } from 'react';
import useAuthStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

type LoginResponse = {
  userId: number;
  profileImage: string;
  name: string;
  nickName: string;
  role: string;
  jwtTokenDto: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    accessTokenExpiredIn: string;
    refreshTokenExpiredIn: string;
  };
  uuid: string;
};

const DevMode = () => {
  const [status, setStatus] = useState('loading');
  const setAccessToken = useAuthStore.use.setAccessToken();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogin = useCallback(
    async (id: number) => {
      const response = await axios.post<LoginResponse>('/test/login', {
        memberId: id,
      });

      if (response?.status !== 200) {
        setStatus('error');
        return;
      }

      console.log(response);

      const { jwtTokenDto, ...user } = response.data.data;

      setAccessToken(jwtTokenDto.accessToken);

      setStatus('done');

      queryClient.invalidateQueries();

      router.refresh();
    },
    [setAccessToken, queryClient, router],
  );

  const handleLogout = async () => {
    await axios.get('/member/logout');

    setAccessToken('');
    router.refresh();
  };

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <div
          className={css({
            sm: {
              display: 'flex',
            },
            display: 'none',
            textStyle: 'headline1.bold',
            position: 'fixed',
            bgColor: 'secondary.normal',
            p: '1rem',
            top: '2rem',
            left: '2rem',
            flexDir: 'column',
            gap: '2',
            textAlign: 'center',
          })}
        >
          DEV MODE
          <Button onClick={() => handleLogin(11)}>PARENT LOGIN</Button>
          <Button onClick={() => handleLogin(12)}>CHILD LOGIN</Button>
          <Button onClick={handleLogout}>LOGOUT</Button>
        </div>
      )}
    </>
  );
};

export default DevMode;
