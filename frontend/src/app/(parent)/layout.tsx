'use client';

import { useAuthWithRoles } from '@/hooks/useAuth';

const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthWithRoles(['PARENT']);

  return <>{children}</>;
};

export default ParentLayout;
