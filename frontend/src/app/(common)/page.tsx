'use client';

import ChildHome from '@/containers/home/ChildHome';
import ParentHome from '@/containers/home/ParentHome';
import { useMe } from '@/hooks/useAuth';
import { css } from 'styled-system/css';

export default function Home() {
  const { data: me } = useMe();

  if (me?.role === 'PARENT') {
    return <ParentHome />;
  }

  if (me?.role === 'CHILD') {
    return <ChildHome />;
  }

  // 기본적으로 null을 반환하거나, 다른 기본 컴포넌트를 반환할 수 있습니다.
  return null;
}
