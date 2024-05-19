'use client';

import axios from '@/apis/axios';
import StoreCategory from '@/components/store/StoreCategory';
import { PointAmount } from '@/types/point';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-system/css';

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

  const getPoint = async () => {
    return await axios.get<PointAmount>('/point/amount').then((res) => {
      return res.data.data;
    });
  };

  const amount = useQuery({
    queryKey: ['point'],
    queryFn: getPoint,
  });

  const defaultBrand = ['드림아트', '', '리코즈', 'GS25', ''];

  return (
    <>
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
          scroll={false}
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
          px: '1rem',
          mt: '1.25rem',
        })}
      >
        <div
          className={css({
            display: 'flex',
            w: 'full',
            flexDir: 'column',
            gap: '1rem',
          })}
        >
          {categories.map((category, id) => (
            <Link
              key={id}
              href={{
                pathname: '/store/category',
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
        </div>
      </div>
    </>
  );
};
export default Category;
