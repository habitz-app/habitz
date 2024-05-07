import type { Metadata } from 'next';
import { Pretendard } from './fonts';
import './globals.css';
import { css } from 'styled-system/css';
import Script from 'next/script';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'habitz',
  description: 'Earn habitz from your parents by completing mission!',
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Pretendard.variable}>
      <body className={css({ font: 'pretendard' })}>
        <Providers>
          {children}
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
            integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}
