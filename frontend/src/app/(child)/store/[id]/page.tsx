'use client';
import BuyButton from '@/components/store/BuyButton';
import GoodsDetail from '@/components/store/GoodsDetail';
import { useRouter } from 'next/navigation';
import { Stack } from 'styled-system/jsx';
import type { ProductResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import Link from 'next/link';
import { PointAmount } from '@/types/point';
import Image from 'next/image';

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
    if (amount.data === undefined || productInfo.data === undefined) return;
    if (amount.data?.point < productInfo.data?.price) {
      alert('포인트가 부족합니다.');
    } else {
      route.push(`/store/bill/${params.id}`);
    }
  };

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
          p: '1rem',
        })}
      ></div>
      <Stack gap="1rem" position={'relative'}>
        <GoodsDetail
          name={productInfo.data?.productName ?? '상품이 존재하지 않습니다.'}
          price={productInfo.data?.price ?? 0}
          url={productInfo.data?.productImage ?? ''}
        />

        {productInfo.data?.description &&
          productInfo.data.description.trim() !== '' &&
          productInfo.data.description.split(',').map((desc, id) => (
            <div
              key={id}
              className={css({
                position: 'relative',
              })}
            >
              <Image
                src={desc}
                alt={productInfo.data?.productName}
                fill
                sizes="300px"
                className={css({
                  position: 'relative!',
                  h: 'unset!',
                })}
              />
            </div>
          ))}

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
