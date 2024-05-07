import { Suspense } from 'react';

const oAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};

export default oAuthLayout;
