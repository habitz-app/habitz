'use client';
import { useState, Dispatch, useEffect } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import axios from '@/apis/axios';
import { ChildListResponse, BannedProductReponse } from '@/types/api/response';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
interface createSchedule {
  title: string;
  content: string;
  emoji: string;
  childUUID: string;
  startDate: string;
  endDate: string;
  weekDays: boolean[];
  point: number;
}

const Page = () => {
  const [children, setChildren] = useState<ChildListResponse[]>([]);
  const [status, setStatus] = useState<string>('');
  const [bannedProductList, setBannedProductList] = useState<
    BannedProductReponse[]
  >([]);
  const [childStatus, setChildStatus] = useState<string>('');
  const getBannedProduct = (childUUID: string) => {
    setChildStatus(childUUID);
    axios
      .get<BannedProductReponse[]>(`/store/banned-product/list/${childUUID}`)
      .then((response) => {
        setBannedProductList(response.data.data.content);
      });
  };

  const removeBannedProduct = (childUUID: string, productId: number) => {
    console.log('childUUID:', childUUID);
    console.log('productId:', productId);
    axios
      .delete<string>(
        `/store/banned-product/restrict/${childUUID}/${productId}`,
      )
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
            <Image src={child.profileImage} width={100} height={100} />
            <p>{child.name}</p>
          </Stack>
        ))}
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
              />
              <p>{bannedProduct.productName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Page;
