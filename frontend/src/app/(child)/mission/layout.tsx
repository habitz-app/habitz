'use client';
import ChildTabBar from '@/components/common/TabBar/ChildTabBar';
import { useAuthWithRole } from '@/hooks/useAuth';
import { MenuType } from '@/types/tabBar/childTabBar';
import { usePathname } from 'next/navigation';
import { css } from 'styled-system/css';

const MissionLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRole('CHILD');

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
    </div>
  );
};

export default MissionLayout;
