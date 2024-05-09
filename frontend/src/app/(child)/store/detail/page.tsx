'use client';
import BuyButton from '@/components/store/BuyButton';
import GoodsDetail from '@/components/store/GoodsDetail';
import GoodsInfo from '@/components/store/GoodsInfo';
import { Stack } from 'styled-system/jsx';

const Product = () => {
  const name = '세븐일레븐 기프트 카드 1만원권';
  const price = 10000;
  const url = '/seven-eleven.jpg';
  const infoUrl = '/height_long.jpeg';
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
