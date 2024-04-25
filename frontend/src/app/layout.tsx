import type { Metadata } from 'next';
import { Pretendard } from './fonts';
import './globals.css';
import { css } from 'styled-system/css';

export const metadata: Metadata = {
  title: 'habitz',
  description: 'Earn habitz from your parents by completing mission!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body className={css({ font: 'pretendard' })}>{children}</body>
    </html>
  );
}
