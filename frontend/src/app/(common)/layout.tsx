'use client';
import ChildTabBar from '@/components/common/TabBar/ChildTabBar';
import { css } from 'styled-system/css';
import { usePathname } from 'next/navigation';
import { MenuType as ChildMenuType } from '@/types/tabBar/childTabBar';
import { MenuType as ParentMenuType } from '@/types/tabBar/parentTabBar';
import { useAuthWithRoles, useMe } from '@/hooks/useAuth';
import { Suspense } from 'react';
import ParentTabBar from '@/components/common/TabBar/ParentTabBar';

const parentMenu: {
  [key: string]: ParentMenuType;
} = {
  '/': 'home',
  '/manage/children': 'child',
  '/manage/mission': 'mission',
  '/manage/store': 'store',
  '/more': 'more',
};

const childMenu: {
  [key: string]: ChildMenuType;
} = {
  '/': 'home',
  '/quiz': 'quiz',
  '/mission': 'mission',
  '/store': 'store',
  '/more': 'more',
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRoles(['PARENT', 'CHILD']);

  const me = useMe();

  const path = usePathname();

  return (
    <Suspense>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: 'full',
        })}
      >
        <main className={css({ minH: 'calc(100vh - 5rem)' })}>{children}</main>
        {me?.data?.role === 'CHILD' ? (
          <ChildTabBar menu={childMenu[path] as ChildMenuType} />
        ) : (
          <ParentTabBar menu={parentMenu[path] as ParentMenuType} />
        )}
      </div>
    </Suspense>
  );
};

export default CommonLayout;
