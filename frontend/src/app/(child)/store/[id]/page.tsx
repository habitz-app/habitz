'use client';
import BuyButton from '@/components/store/BuyButton';
import GoodsDetail from '@/components/store/GoodsDetail';
import GoodsInfo from '@/components/store/GoodsInfo';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';

import type { ProductResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import Link from 'next/link';

const Product = ({ params }: { params: { id: number } }) => {
  const route = useRouter();

  const productInfo = useQuery({
    queryKey: ['productInfo', params.id],
    queryFn: async () => {
      const res = await axios.get<ProductResponse>(`/store/${params.id}`);

      return res.data?.data ?? {};
    },
  });

  const buyHandler = () => {
    route.push(`/store/bill/${params.id}`);
  };
  return (
    <div>
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'background.normal.normal/80',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          justifyContent: 'space-between',
          alignItems: 'end',
        })}
      >
        <Link
          className={css({
            fontFamily: 'yeoljeong',
            fontSize: '28px',
            lineHeight: '38.02px',
            color: 'label.alternative',
          })}
          href={'/'}
        >
          habitz
        </Link>
        <span
          className={css({
            display: 'flex',
            textStyle: 'headline1.bold',
            gap: '0.125rem',
            py: '0.25rem',
          })}
        ></span>
      </header>
      <div
        className={css({
          display: 'flex',
          w: 'full',
          flexDir: 'column',
          p: '1rem',
        })}
      ></div>
      <Stack gap="1rem" position={'relative'}>
        <GoodsDetail
          name={productInfo.data?.productName ?? '상품이 존재하지 않습니다.'}
          price={productInfo.data?.price ?? 0}
          url={productInfo.data?.productImage ?? ''}
        />

        <div
          className={css({
            display: 'flex',
            gap: '1rem',
            justifyContent: 'end',
            pr: 10,
          })}
        ></div>
        <BuyButton clickHandler={buyHandler} />
      </Stack>
    </div>
  );
};
export default Product;
