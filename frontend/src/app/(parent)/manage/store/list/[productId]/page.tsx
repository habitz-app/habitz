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
import { invalidData } from '@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js';

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
    <Stack gap="1rem" position={'relative'}>
      <GoodsDetail
        name={productInfo.data?.productName ?? '상품이 존재하지 않습니다.'}
        price={productInfo.data?.price ?? 0}
        url={productInfo.data?.productImage ?? ''}
      />

      <div
        className={css({
          display: 'flex',
        })}
      >
        {bannedProduct.data?.map((childInfo, id) => (
          <div
            key={id}
            onClick={() => {
              onClickBan(childInfo.childUuid, childInfo.isBanned);
            }}
          >
            <Image
              src={childInfo.profileImageUrl}
              width={30}
              height={30}
              alt={childInfo.name}
            />
            <p>{childInfo.name}</p>
            <p
              className={item({
                isBanned: childInfo.isBanned,
              })}
            >
              {childInfo.isBanned ? 'a' : 'b'}
            </p>
          </div>
        ))}
      </div>
    </Stack>
  );
};
export default Product;
