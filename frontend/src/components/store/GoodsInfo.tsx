'use client';
import Image from 'next/image';
import { Container, Stack } from 'styled-system/jsx';
import images from 'public/convenience-store.jpg';
import { css } from 'styled-system/css';
import { useState } from 'react';
const GoodsInfo = ({ url }: { url: string }) => {
  const [image, setImage] = useState<string>(url);
  return (
    <Stack gap={'1.25rem'}>
      <h1
        className={css({
          px: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
        })}
      >
        상품 정보
      </h1>
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        alt="상품 이미지"
        className={css({ w: 'full', h: 'auto' })}
      />
    </Stack>
  );
};
export default GoodsInfo;
