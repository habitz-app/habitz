'use client';

import { Suspense } from 'react';

export default function ChargeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
