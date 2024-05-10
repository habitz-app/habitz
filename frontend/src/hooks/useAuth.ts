'use client';
import useAuthStore from '@/stores/authStore';
import { useLayoutEffect } from 'react';
import { reissue } from '@/apis/axios';
import { useRouter } from 'next/navigation';
import axios from '@/apis/axios';
import { MemberResponse } from '@/types/api/response';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const getUserData = async () => {
  return await axios.get<MemberResponse>('/member').then((res) => {
    return res.data.data;
  });
};

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

export const useRoles = (roles: string[]) => {
  const me = useQuery<MemberResponse>({
    queryKey: ['me'],
    queryFn: getUserData,
  });
  const router = useRouter();

  useLayoutEffect(() => {
    const myInfo = me.data;

    if (myInfo && !roles.includes(myInfo.role)) {
      alert('페이지 접근 권한이 없습니다.');
      if (myInfo.role === 'GUEST') {
        return router.push('/join');
      }
      router.back();
    }
  }, [router, me.data, roles]);
};

export const useAuthWithRoles = (roles: string[]) => {
  useAuth();
  useRoles(roles);
};
