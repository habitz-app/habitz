'use client';
import BuyButton from '@/components/store/BuyButton';
import GoodsDetail from '@/components/store/GoodsDetail';
import GoodsInfo from '@/components/store/GoodsInfo';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';

const dummyName = '세븐일레븐 기프트 카드 1만원권';
const dummyPrice = 10000;
const dummyUrl = '/seven-eleven.jpg';
const dummyInfoUrl = '/height_long.jpeg';

const Product = () => {
  const params = useParams();
  const [name, setName] = useState(dummyName);
  const [price, setPrice] = useState(dummyPrice);
  const [url, setUrl] = useState(dummyUrl);
  const [infoUrl, setInfoUrl] = useState(dummyInfoUrl);
  const buyHandler = () => {
    console.log('구매하기');
  };
  return (
    <Stack gap="1rem" position={'relative'}>
      <GoodsDetail name={name} price={price} url={url} />
      <GoodsInfo url={infoUrl} />
      <BuyButton clickHandler={buyHandler} />
    </Stack>
  );
};
export default Product;
