'use client';
import { css, cva } from 'styled-system/css';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import { ChildListResponse, ProductListResponse } from '@/types/api/response';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { IonIcon } from '@ionic/react';
import { chevronBack, storefront } from 'ionicons/icons';
import { useState } from 'react';
import { HStack, Stack } from 'styled-system/jsx';

const Store = () => {
  const router = useRouter();

  const [showStatus, setShowStatus] = useState(false);

  const children = useQuery({
    queryKey: ['ChildList'],
    queryFn: async () => {
      const res = await axios.get<ChildListResponse[]>(`/family/childList`);
      if (res.data?.data) {
        setChildUuid(res.data?.data[0].uuid);
        getBannedProduct(res.data?.data[0].uuid);
      }
      return res.data?.data ?? [];
    },
  });

  const [bannedProductList, setBannedProductList] =
    useState<ProductListResponse>({
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: false,
        offset: 0,
        sort: {
          sorted: false,
          unsorted: false,
          empty: false,
        },
      },
      size: 0,
      number: 0,
      sort: {
        sorted: false,
        unsorted: false,
        empty: false,
      },
      first: false,
      last: false,
      numberOfElements: 0,
      empty: false,
    });

  const getBannedProduct = async (childUuidInput: string) => {
    const res = await axios.get<ProductListResponse>(
      `/store/banned-product/list/${childUuidInput}`,
    );
    setBannedProductList(res.data?.data ?? []);
    setShowStatus(true);
    setChildUuid(childUuidInput);
  };

  const removeBan = async (childUuid: string, productId: number) => {
    const res = await axios.delete<string>(
      `store/banned-product/restrict/${childUuid}/${productId}`,
    );
    getBannedProduct(childUuid);
  };
  const item = cva({
    base: {
      display: 'flex',
      textStyle: 'label1.normal.bold',
    },
    variants: {
      visual: {
        isSelect: {
          borderRadius: '50%',
          border: '1px solid',
          filter: 'brightness(50%)',
        },
        noSelect: {
          borderRadius: '50%',
          border: '1px solid',
          // filter: 'brightness(60%)',
        },
      },
    },
  });
  const [childUuid, setChildUuid] = useState<string>('');

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
        <p
          className={css({
            textStyle: 'title2.bold',
          })}
        >
          상점 관리
        </p>
        <IonIcon
          icon={storefront}
          className={css({
            fontSize: '30px',
            display: 'flex',
            textStyle: 'headline3.bold',
            position: 'absolute',
            right: '1rem',
          })}
          onClick={() => {
            router.push('/manage/store/menu');
          }}
        />
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
        <HStack>
          {children.data?.map((child) => (
            <Stack
              key={child.memberId}
              alignItems={'center'}
              onClick={() => getBannedProduct(child.uuid)}
            >
              <Image
                src={child.profileImage}
                width={70}
                height={70}
                alt={child.name + '의 프로필'}
                className={item({
                  visual: childUuid == child.uuid ? 'noSelect' : 'isSelect',
                })}
              />
              <p>{child.name}</p>
            </Stack>
          ))}
        </HStack>

        {showStatus && (
          <div>
            <p
              className={css({
                textStyle: 'title3.bold',
                mb: '1rem',
              })}
            >
              금지상품 목록
            </p>
            {bannedProductList.content.map((bannedProduct) => (
              <div key={bannedProduct.productId}>
                <div
                  className={css({
                    display: 'flex',
                  })}
                >
                  <Image
                    src={bannedProduct.productImage}
                    width={100}
                    height={100}
                    className={css({
                      mx: '1rem',
                      mb: '1rem',
                    })}
                    alt="상품 이미지"
                  />
                  <div
                    className={css({
                      w: '15rem',
                    })}
                  >
                    <div
                      className={css({
                        h: 10,
                      })}
                    >
                      <p
                        className={css({
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        })}
                      >
                        {bannedProduct.productName}
                      </p>
                    </div>
                    <div
                      className={css({
                        display: 'flex',

                        justifyContent: 'end',
                      })}
                    >
                      <Button
                        onClick={() =>
                          removeBan(childUuid, bannedProduct.productId)
                        }
                        className={css({
                          bg: 'status.negative',
                        })}
                      >
                        해제
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
