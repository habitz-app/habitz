'use client';

import { useAuth, useAuthWithRoles } from '@/hooks/useAuth';
import { css } from 'styled-system/css';

export default function Home() {
  useAuthWithRoles(['PARENT', 'CHILD']);

  return (
    <main>
      <p className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Hello 🐼!</p>
    </main>
  );
}
