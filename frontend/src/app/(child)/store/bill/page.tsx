'use client';
import GoodsCard from '@/components/store/GoodsCard';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

const dummyUrl = '/height_long.jpeg';
const dummyName = '세븐일레븐 기프트 카드 1만원권';
const dummyBrand = '편의점';
const dummyPrice = 10000;

const Bill = () => {
  const [url, setUrl] = useState(dummyUrl);
  const [name, setName] = useState(dummyName);
  const [brand, setBrand] = useState(dummyBrand);
  const [price, setPrice] = useState(dummyPrice);
  return (
    <Stack w="full" justify="space-between" align="center" px="1rem">
      <GoodsCard
        url={url}
        name={name}
        brand={brand}
        price={dummyPrice}
      ></GoodsCard>
      <hr className={css({ w: 'full', borderWidth: '1px' })} />
      <p>디자인 추가 후 구현 예정</p>
    </Stack>
  );
};
export default Bill;
