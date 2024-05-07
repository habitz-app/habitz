'use client';
import ChildTabBar from '@/components/common/TabBar/ChildTabBar';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { usePathname } from 'next/navigation';
import { MenuType } from '@/types/tabBar/childTabBar';
const ChildLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const menu = path?.split('/')[1];
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: 'full',
      })}
    >
      <main className={css({ minH: '100vh' })}>{children}</main>
      <ChildTabBar menu={menu as MenuType} />
    </div>
  );
};

export default ChildLayout;
