'use client';

import ParentTabBar from '@/components/common/TabBar/ParentTabBar';
import { useAuthWithRoles } from '@/hooks/useAuth';
import { MenuType } from '@/types/tabBar/parentTabBar';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { css } from 'styled-system/css';

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRoles(['PARENT']);

  const path = usePathname();

  const menus: {
    [key: string]: MenuType;
  } = {
    '/': 'home',
    '/manage/children': 'child',
    '/manage/mission': 'mission',
    '/manage/store': 'store',
    '/more': 'more',
  };

  return (
    <Suspense>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: 'full',
        })}
      >
        <main
          className={css({
            minH: '100vh',
            display: 'flex',
            flexDirection: 'column',
          })}
        >
          {children}
        </main>
        <ParentTabBar menu={menus[path] as MenuType} />
      </div>
    </Suspense>
  );
};

export default ParentLayout;
