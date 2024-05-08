'use client';
import useAuthStore from '@/stores/authStore';
import { useLayoutEffect } from 'react';
import { reissue } from '@/apis/axios';

const useAuth = () => {
  useLayoutEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      console.log('access token is not exist');

      reissue().then(() => {
        console.log(useAuthStore.getState().accessToken);
      });
    }
  }, []);
};

export default useAuth;
