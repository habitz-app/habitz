'use client';
import { useState } from 'react';
import GoodsCategory from '@/components/store/GoodsCategory';
import { Grid, HStack, Stack } from 'styled-system/jsx';
import GoodsItem from '@/components/store/GoodsItem';
import { css } from 'styled-system/css';
import { button } from 'styled-system/recipes';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface brand {
  url: string;
  brand: string;
}
const Store = () => {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || '???',
  );
  const [brands, setBrands] = useState<brand[]>([
    {
      url: '/CU.jpg',
      brand: 'CU',
    },
    {
      url: '/GS25.png',
      brand: 'GS25',
    },
    {
      url: '/emart24.png',
      brand: '이마트24',
    },
    {
      url: '/seven-eleven.jpg',
      brand: '세븐일레븐',
    },
  ]);
  return (
    <Stack padding={10}>
      <h1>{category}</h1>
      <HStack>
        {brands.map((brand, id) => (
          <button
            key={id}
            className={css({ cursor: 'pointer' })}
            onClick={() => {
              console.log(brand.brand);
            }}
          >
            <GoodsCategory url={brand.url} brand={brand.brand} />
          </button>
        ))}
      </HStack>
      <Grid columns={3} gap="5" alignItems={'center'}>
        {[...Array(20)].map((_, id) => (
          <Link key={id} href={`/store/${id}`}>
            <GoodsItem
              key={id}
              name="캐치티니핑 캔디콤팩트 캐치티니핑 캔디콤팩트"
              brand="티니핑"
              url="/coin.svg"
              price={2880}
            ></GoodsItem>
          </Link>
        ))}
      </Grid>
    </Stack>
  );
};
export default Store;
