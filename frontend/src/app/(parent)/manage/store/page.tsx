'use client';
import { useState, useEffect } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import axios from '@/apis/axios';
import { useRouter } from 'next/navigation';
import {
  ChildListResponse,
  BannedProductResponse,
  BannedProductListResponse,
} from '@/types/api/response';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [children, setChildren] = useState<ChildListResponse[]>([]);
  const [bannedProductList, setBannedProductList] = useState<
    BannedProductResponse[]
  >([]);
  const router = useRouter();
  const [childStatus, setChildStatus] = useState<string>('');
  const getBannedProduct = (childUUID: string) => {
    setChildStatus(childUUID);
    axios
      .get<BannedProductListResponse>(`/store/banned-product/list/${childUUID}`)
      .then((response) => {
        setBannedProductList(response.data.data.content);
      });
  };

  const removeBannedProduct = (childUUID: string, productId: number) => {
    console.log('childUUID:', childUUID);
    console.log('productId:', productId);
    axios
      .delete<string>(`/store/banned-product/restrict`, {
        data: {
          productId: productId,
          childId: childUUID,
        },
      })
      .then((response) => {
        console.log('Request Success (RemoveBannedProduct):', response.data);
        getBannedProduct(childUUID);
      });
  };

  useEffect(() => {
    axios.get<ChildListResponse[]>('/family/childList').then((response) => {
      console.log('Request Success (ChildList):', response.data.data);
      setChildren(response.data.data);
    });
  }, []);

  return (
    <div>
      <HStack>
        {children.map((child) => (
          <Stack
            key={child.memberId}
            alignItems={'center'}
            onClick={() => getBannedProduct(child.uuid)}
          >
            <Image
              src={child.profileImage}
              width={100}
              height={100}
              alt={child.name}
            />
            <p>{child.name}</p>
          </Stack>
        ))}
        <p onClick={() => router.push('/manage/store/category')}>
          상점으로 가기
        </p>
      </HStack>
      {childStatus === '' ? (
        <div></div>
      ) : (
        <div>
          <p>금지상품 목록</p>
          {bannedProductList.map((bannedProduct) => (
            <div key={bannedProduct.productId}>
              <Image
                src={bannedProduct.productImage}
                width={100}
                height={100}
                alt={bannedProduct.productName}
              />
              <p>{bannedProduct.productName}</p>
              <Button
                className={css({ backgroundColor: 'status.negative' })}
                onClick={() =>
                  removeBannedProduct(childStatus, bannedProduct.productId)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Page;
