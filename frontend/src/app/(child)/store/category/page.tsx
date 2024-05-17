'use client';
import { Suspense, useState } from 'react';
import GoodsCategory from '@/components/store/GoodsCategory';
import { Grid, HStack, Stack } from 'styled-system/jsx';
import GoodsItem from '@/components/store/GoodsItem';
import { css } from 'styled-system/css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import type { ProductListResponse } from '@/types/api/response';
import { PointAmount } from '@/types/point';
import Image from 'next/image';

interface brand {
  id: number;
  image: string;
  name: string;
}
const Store = () => {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || '전체',
  );
  const [brand, setBrand] = useState<string>(searchParams.get('brand') || '');

  const brandList = useQuery({
    queryKey: ['brandList', category],
    queryFn: async () => {
      const parsedCategory = category.replace('/', ',');
      const res = await axios.get<brand[]>(
        `/store/brand-list/${parsedCategory}`,
      );
      return res.data?.data ?? [];
    },
    enabled: category !== '',
  });

  const productList = useQuery({
    queryKey: ['ProductList', brand],
    queryFn: async () => {
      const parsedCategory = category.replace('/', ',');
      const res = await axios.get<ProductListResponse>(
        `/store/list/${parsedCategory}/${brand}`,
      );
      console.log(res.data?.data.content);

      return res.data?.data.content ?? [];
    },
    enabled: brand !== '',
  });

  const getPoint = async () => {
    return await axios.get<PointAmount>('/point/amount').then((res) => {
      return res.data.data;
    });
  };

  const amount = useQuery({
    queryKey: ['point'],
    queryFn: getPoint,
  });

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
          zIndex: 1,
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
        >
          {amount.data?.point.toLocaleString() || 0}
          <Image src="/coin.svg" alt="coin" width={18} height={18} />
        </span>
      </header>
      <div
        className={css({
          display: 'flex',
          w: 'full',
          flexDir: 'column',
          gap: '1rem',
          mt: '1rem',
        })}
      >
        <Stack px="1rem">
          <p className={css({ textStyle: 'title2.bold' })}>{category}</p>
          <HStack>
            <section
              className={css({
                display: 'flex',
                gap: '0.75rem',
                overflowX: 'scroll',
                h: '7rem',
              })}
            >
              {brandList.data?.map((brand, id) => (
                <button
                  key={id}
                  className={css({ cursor: 'pointer' })}
                  onClick={() => {
                    setBrand(brand.name);
                  }}
                >
                  <GoodsCategory url={brand.image} brand={brand.name} />
                </button>
              ))}
            </section>
          </HStack>
          <p className={css({ textStyle: 'title3.bold' })}>{brand}</p>
          <Grid columns={3} gap="5" alignItems={'center'}>
            {productList.data?.map((product) => (
              <Link
                key={product.productId}
                href={`/store/${product.productId}`}
              >
                <GoodsItem
                  key={product.productId}
                  name={product.productName}
                  brand={product.brand}
                  url={product.productImage}
                  price={product.price}
                ></GoodsItem>
              </Link>
            ))}
          </Grid>
        </Stack>
      </div>
    </div>
  );
};

const StoreWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Store />
  </Suspense>
);

export default StoreWithSuspense;
