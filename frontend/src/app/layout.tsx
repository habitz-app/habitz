import type { Metadata } from 'next';
import { Pretendard, Yeoljeong } from './fonts';
import './globals.css';
import { css } from 'styled-system/css';
import Script from 'next/script';
import Providers from './providers';
import { styled } from 'styled-system/jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'habitz',
  description: 'Earn habitz from your parents by completing mission!',
};

declare global {
  interface Window {
    Kakao: any;
  }
}

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <styled.div
      maxW="430px"
      minH="100vh"
      bgColor="background.normal.normal"
      position="relative"
      left="50vw"
    >
      {children}
    </styled.div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={clsx(Pretendard.variable, Yeoljeong.variable)}>
      <body
        className={css({
          font: 'pretendard',
          bgColor: 'primary.normal',
          position: 'relative',
        })}
      >
        <div
          className={css({
            textStyle: 'hero1.bold',
            color: 'secondary.normal',
            position: 'fixed',
            bottom: '5rem',
            left: '7rem',
          })}
        >
          HABITZ
        </div>
        <MobileLayout>
          <Providers>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
            <Script
              src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
              integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
              crossOrigin="anonymous"
              strategy="beforeInteractive"
            />
          </Providers>
        </MobileLayout>
      </body>
    </html>
  );
}
