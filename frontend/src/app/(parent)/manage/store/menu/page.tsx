'use client';

import axios from '@/apis/axios';
import StoreCategory from '@/components/store/StoreCategory';
import { PointAmount } from '@/types/point';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { useRouter } from 'next/navigation';
import { IonIcon } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
const Category = () => {
  const categories: {
    type: 'toy' | 'book' | 'stationery' | 'convenienceStore' | 'iceCream';
    name: string;
  }[] = [
    { type: 'toy', name: '장난감/인형' },
    { type: 'book', name: '도서/동화책' },
    { type: 'stationery', name: '문구류' },
    { type: 'convenienceStore', name: '편의점' },
    { type: 'iceCream', name: '음료/아이스크림' },
  ];

  const defaultBrand = ['드림아트', '예림당', '리코즈', 'GS25', '배스킨라빈스'];

  const router = useRouter();

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
    <>
      <header
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'background.normal.normal/80',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          zIndex: 9999,
        })}
      >
        <IonIcon
          icon={chevronBack}
          className={css({
            fontSize: '30',
            color: 'label.alternative',
            position: 'absolute',
            left: '1rem',
            cursor: 'pointer',
          })}
          onClick={() => {
            router.back();
          }}
        />

        <p
          className={css({
            textStyle: 'title3.bold',
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
          p: '1rem',
        })}
      >
        <Stack
          h={'100%'}
          justify={'space-between'}
          display="flex"
          flexDir="column"
          gap="1.25rem"
        >
          {categories.map((category, id) => (
            <Link
              key={id}
              href={{
                pathname: '/manage/store/category',
                query: { category: category.name, brand: defaultBrand[id] },
              }}
              scroll={false}
            >
              <StoreCategory
                type={category.type}
                name={category.name}
              ></StoreCategory>
            </Link>
          ))}
        </Stack>
      </div>
    </>
  );
};
export default Category;
