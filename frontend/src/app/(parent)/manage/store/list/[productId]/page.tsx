'use client';
import BuyButton from '@/components/store/BuyButton';
import GoodsDetail from '@/components/store/GoodsDetail';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import axios from '@/apis/axios';
import { Stack, HStack } from 'styled-system/jsx';

import type {
  ProductResponse,
  ProductBannedChildResponse,
} from '@/types/api/response';
import { cva, css } from 'styled-system/css';
import Link from 'next/link';
const Product = ({ params }: { params: { productId: number } }) => {
  const route = useRouter();

  const [showStatus, setShowStatus] = useState(false);
  const productInfo = useQuery({
    queryKey: ['productInfo', params.productId],
    queryFn: async () => {
      const res = await axios.get<ProductResponse>(
        `/store/${params.productId}`,
      );

      return res.data?.data ?? {};
    },
  });
  const queryClient = useQueryClient();
  const onClickBan = (childUuid: string, banStatus: boolean) => {
    if (banStatus) {
      axios
        .delete<string>(
          `/store/banned-product/restrict/${childUuid}/${params.productId}`,
        )
        .then((res) => {
          console.log(res.data.message);
          queryClient.invalidateQueries({
            queryKey: ['bannedProduct', params.productId],
            exact: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post<string>('/store/banned-product/restrict', {
          productId: params.productId,
          childId: childUuid,
        })
        .then((res) => {
          console.log(res.data.message);
          queryClient.invalidateQueries({
            queryKey: ['bannedProduct', params.productId],
            exact: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const bannedProduct = useQuery({
    queryKey: ['bannedProduct', params.productId],
    queryFn: async () => {
      const res = await axios.get<ProductBannedChildResponse[]>(
        `/store/banned-product/${params.productId}`,
      );
      return res.data?.data ?? {};
    },
  });

  const item = cva({
    base: {
      display: 'flex',
    },
    variants: {
      isBanned: {
        true: {
          color: 'status.negative',
        },
        false: {
          color: 'status.positive',
        },
      },
    },
  });

  return (
    <div>
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '2.5rem',
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
        >
          {bannedProduct.data?.map((childInfo, id) => (
            <div
              key={id}
              onClick={() => {
                onClickBan(childInfo.childUuid, childInfo.isBanned);
              }}
              className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              })}
            >
              <Image
                src={childInfo.profileImageUrl}
                width={50}
                height={50}
                alt={childInfo.name}
                className={css({
                  borderRadius: '50%',
                  border: '1px solid',
                })}
              />
              <p>{childInfo.name}</p>
              <p
                className={item({
                  isBanned: childInfo.isBanned,
                })}
              >
                {childInfo.isBanned ? '제한' : '허용'}
              </p>
            </div>
          ))}
        </div>
      </Stack>
    </div>
  );
};
export default Product;
