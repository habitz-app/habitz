'use client';
import axios from '@/apis/axios';
import GoodsCard from '@/components/store/GoodsCard';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import type { ProductResponse } from '@/types/api/response';
const Bill = ({ params }: { params: { id: number } }) => {
  const productInfo = useQuery({
    queryKey: ['productInfo', params.id],
    queryFn: async () => {
      const res = await axios.get<ProductResponse>(`/store/${params.id}`);

      return res.data?.data ?? {};
    },
  });

  return (
    <div>
      <Stack
        w="full"
        justify="space-between"
        align="center"
        px="1rem"
        py="0.75rem"
      >
        {productInfo.data && (
          <GoodsCard
            url={productInfo.data?.productImage}
            name={productInfo.data?.productName}
            brand={productInfo.data.brand}
            price={productInfo.data.price}
          ></GoodsCard>
        )}
        <hr className={css({ w: 'full', borderWidth: '1px' })} />
        <p>디자인 추가 후 구현 예정</p>
      </Stack>
    </div>
  );
};
export default Bill;
