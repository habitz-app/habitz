'use client';
import ChildTabBar from '@/components/common/TabBar/ChildTabBar';
import { css } from 'styled-system/css';
import { usePathname } from 'next/navigation';
import { MenuType as ChildMenuType } from '@/types/tabBar/childTabBar';
import { MenuType as ParentMenuType } from '@/types/tabBar/parentTabBar';
import { useAuthWithRoles, useMe } from '@/hooks/useAuth';
import { Suspense, useEffect } from 'react';
import ParentTabBar from '@/components/common/TabBar/ParentTabBar';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRoles(['PARENT', 'CHILD']);

  const me = useMe();

  const path = usePathname();
  const menu = path?.split('/')[1];

  useEffect(() => {
    console.log(path);
    console.log(menu);
  });

  return (
    <Suspense>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: 'full',
        })}
      >
        <main className={css({ minH: '100vh' })}>{children}</main>
        {me?.data?.role === 'CHILD' ? (
          <ChildTabBar menu={menu as ChildMenuType} />
        ) : (
          <ParentTabBar menu={menu as ParentMenuType} />
        )}
      </div>
    </Suspense>
  );
};

export default CommonLayout;
