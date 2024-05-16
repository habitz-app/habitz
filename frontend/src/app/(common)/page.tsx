'use client';

import ChildHome from '@/containers/home/ChildHome';
import ParentHome from '@/containers/home/ParentHome';
import { useMe } from '@/hooks/useAuth';
import { css } from 'styled-system/css';

export default function Home() {
  const me = useMe();

  return <>{me.data?.role === 'PARENT' ? <ParentHome /> : <ChildHome />}</>;
}
