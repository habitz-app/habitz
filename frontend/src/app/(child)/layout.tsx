'use client';
import ChildTabBar from '@/components/common/TabBar/ChildTabBar';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { css } from 'styled-system/css';

const ChildLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        w: 'full',
        minH: 'calc(100vh - 5rem)',
      })}
    >
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '2.5rem',
          top: 0,
          bg: 'background.normal.normal/80',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          justifyContent: 'flex-end',
          alignItems: 'center',
        })}
      >
        <Button color="label.alternative" variant="link">
          <IonIcon
            icon={heart}
            className={css({
              w: '24px',
              h: '24px',
            })}
          />
        </Button>
      </header>
      {children}
      <ChildTabBar menu={'home'} />
    </div>
  );
};

export default ChildLayout;
