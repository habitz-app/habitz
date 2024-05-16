'use client';
import { useState, Suspense } from 'react';
import GoodsCategory from '@/components/store/GoodsCategory';
import { Grid, HStack, Stack } from 'styled-system/jsx';
import GoodsItem from '@/components/store/GoodsItem';
import { css } from 'styled-system/css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from '@/apis/axios';
import type { ProductListResponse } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';
import { IonIcon } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useRouter } from 'next/navigation';
interface brand {
  id: number;
  image: string;
  name: string;
}
const Store = () => {
  const params = useSearchParams();

  const router = useRouter();

  const [category, setCategory] = useState<string>(
    params.get('category') || '',
  );
  const [currBrand, setCurrBrand] = useState<string>(params.get('brand') || '');

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
    queryKey: ['ProductList', currBrand],
    queryFn: async () => {
      const parsedCategory = category.replace('/', ',');
      const parsedBrand = currBrand.replace('/', ',');
      const res = await axios.get<ProductListResponse>(
        `/store/list/${parsedCategory}/${parsedBrand}`,
      );

      return res.data?.data.content ?? [];
    },
    enabled: currBrand !== '',
  });

  return (
    <div>
      <header
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          p: '1rem',
          justifyContent: 'center',
        })}
      >
        <IonIcon
          icon={chevronBack}
          className={css({
            fontSize: '30',
            color: 'label.alternative',
            position: 'absolute',
            left: '1rem',
          })}
          onClick={() => {
            router.back();
          }}
        />

        <p
          className={css({
            textStyle: 'title2.bold',
          })}
        >
          상점 관리
        </p>
      </header>
      <div
        className={css({
          display: 'flex',
          w: 'full',
          flexDir: 'column',
          gap: '1rem',
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
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              })}
            >
              {brandList.data?.map((brand, id) => (
                <button
                  key={id}
                  className={css({ cursor: 'pointer' })}
                  onClick={() => {
                    setCurrBrand(brand.name);
                  }}
                >
                  <GoodsCategory url={brand.image} brand={brand.name} />
                </button>
              ))}
            </section>
          </HStack>
          <p className={css({ textStyle: 'title3.bold' })}>{currBrand}</p>
          <Grid columns={3} gap="5" alignItems={'center'}>
            {productList.data?.map((product) => (
              <Link
                key={product.productId}
                href={`/manage/store/${product.productId}`}
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
