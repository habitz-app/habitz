'use client';
import { css, cva } from 'styled-system/css';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import { ChildListResponse, ProductListResponse } from '@/types/api/response';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { IonIcon } from '@ionic/react';
import { storefrontOutline } from 'ionicons/icons';
import { useState } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
const Store = () => {
  const router = useRouter();
  const [showStatus, setShowStatus] = useState(false);
  const children = useQuery({
    queryKey: ['ChildList'],
    queryFn: async () => {
      const res = await axios.get<ChildListResponse[]>(`/family/childList`);
      console.log(res.data?.data);

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

  const getBannedProduct = async (childUuid: string) => {
    const res = await axios.get<ProductListResponse>(
      `/store/banned-product/list/${childUuid}`,
    );
    setBannedProductList(res.data?.data ?? []);
    setShowStatus(true);
    setChildUuid(childUuid);
  };

  const removeBan = async (childUuid: string, productId: number) => {
    const res = await axios.delete<string>(
      `store/banned-product/restrict/${childUuid}/${productId}`,
    );
    getBannedProduct(childUuid);
    console.log(res.data.message);
  };

  const [childUuid, setChildUuid] = useState<string>('');

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
          gap: '1rem',
          p: '1rem',
        })}
      >
        <div
          onClick={() => {
            router.push('/manage/store/menu');
          }}
          className={css({
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textStyle: 'headline3.bold',
          })}
        >
          <IonIcon
            icon={storefrontOutline}
            className={css({ fontSize: '24px', color: 'label.alternative' })}
          />
          상점으로 가기
        </div>

        <HStack>
          {children.data?.map((child) => (
            <Stack
              key={child.memberId}
              alignItems={'center'}
              onClick={() => getBannedProduct(child.uuid)}
            >
              <Image
                src={child.profileImage}
                width={100}
                height={100}
                alt={child.name + '의 프로필'}
                className={css({
                  borderRadius: '50%',
                  border: '1px solid',
                })}
              />
              <p>{child.name}</p>
            </Stack>
          ))}
        </HStack>

        {showStatus ? (
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
                      w: '17rem',
                      pr: '1rem',
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
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Store;
