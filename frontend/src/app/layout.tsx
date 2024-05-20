import type { Metadata } from 'next';
import { Pretendard, Yeoljeong } from './fonts';
import './globals.css';
import { css } from 'styled-system/css';
import Script from 'next/script';
import Providers from './providers';
import { styled } from 'styled-system/jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import clsx from 'clsx';
import DevMode from '@/containers/common/DevMode';

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
      className={css({
        sm: {
          left: '50vw',
        },
      })}
      maxW="430px"
      minH="calc(100vh - 5rem)"
      bgColor="background.normal.normal"
      position="relative"
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
          fontFamily: 'pretendard',
          bgColor: 'primary.normal',
          position: 'relative',
        })}
      >
        <div
          className={css({
            sm: {
              display: 'block',
            },
            display: 'none',
            textStyle: 'hero1.regular',
            color: 'secondary.normal',
            position: 'fixed',
            bottom: '5rem',
            left: '7rem',
            userSelect: 'none',
          })}
        >
          habitz
        </div>
        <MobileLayout>
          <Providers>
            <ReactQueryDevtools initialIsOpen={false} />
            <DevMode />
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
