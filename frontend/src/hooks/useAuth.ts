'use client';
import useAuthStore from '@/stores/authStore';
import { useLayoutEffect } from 'react';
import { reissue } from '@/apis/axios';
import useUserStore from '@/stores/userStore';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  // access token 검증 로직
  useLayoutEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      console.log('access token is not exist. reissuing...');

      reissue();
    }
  }, []);
};

export const useRole = (role: string) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const userRole = useUserStore.getState().role;

    if (role !== userRole) {
      alert('페이지 접근 권한이 없습니다.');
      router.back();
    }
  });
};

export const useAuthWithRole = (role: string) => {
  useAuth();
  useRole(role);
};
