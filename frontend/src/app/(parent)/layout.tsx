'use client';

import { useAuthWithRoles } from '@/hooks/useAuth';
import { Suspense } from 'react';
import { css } from 'styled-system/css';

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRoles(['PARENT']);

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
      </div>
    </Suspense>
  );
};

export default ParentLayout;
