'use client';

import { useAuthWithRole } from '@/hooks/useAuth';

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRole('PARENT');

  return <>{children}</>;
};

export default ParentLayout;
