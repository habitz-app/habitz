'use client';

import KakaoLoginButton from '@/components/login/KakaoLoginButton';
import { useEffect } from 'react';
import { css } from 'styled-system/css';

const Login = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;
      console.log(Kakao);
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SDK_KEY);
        console.log('Kakao is initialized');
      }
    }
  }, []);

  return (
    <div
      className={css({
        h: '100vh',
        w: 'full',
        bg: 'primary.normal',
        px: '1rem',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <h1
        className={css({
          textStyle: 'hero1.bold',
          color: 'secondary.normal',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          h: '1/3',
        })}
      >
        HABITZ
      </h1>
      <KakaoLoginButton
        handleClick={() => {
          const { Kakao } = window;

          Kakao.Auth.authorize({
            redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}/oauth/kakao`,
          });
        }}
      />
    </div>
  );
};

export default Login;
