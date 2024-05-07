'use client';

import { useEffect } from 'react';

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
    <div>
      <h1>Login</h1>
      <button
        type="button"
        onClick={() => {
          const { Kakao } = window;

          Kakao.Auth.authorize({
            redirectUri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}/oauth/kakao`,
          });
        }}
      >
        login
      </button>
    </div>
  );
};

export default Login;
