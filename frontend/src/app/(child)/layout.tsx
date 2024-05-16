'use client';
import ChildTabBar from '@/components/common/TabBar/ChildTabBar';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { usePathname } from 'next/navigation';
import { MenuType } from '@/types/tabBar/childTabBar';
import { useAuthWithRoles } from '@/hooks/useAuth';
import { Suspense } from 'react';

const ChildLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRoles(['CHILD']);

  const path = usePathname();

  const menus: {
    [key: string]: MenuType;
  } = {
    '/': 'home',
    '/quiz': 'quiz',
    '/mission': 'mission',
    '/store': 'store',
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
        <main className={css({ minH: '100vh' })}>{children}</main>
        <ChildTabBar menu={menus[path] as MenuType} />
      </div>
    </Suspense>
  );
};

export default ChildLayout;
