'use client';
import BuyButton from '@/components/store/BuyButton';
import GoodsDetail from '@/components/store/GoodsDetail';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import axios from '@/apis/axios';
import { Stack, HStack } from 'styled-system/jsx';
import { IonIcon } from '@ionic/react';
import { banOutline, chevronBack, ellipseOutline } from 'ionicons/icons';
import type {
  ProductResponse,
  ProductBannedChildResponse,
} from '@/types/api/response';
import { cva, css } from 'styled-system/css';
const Product = ({ params }: { params: { productId: number } }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [showStatus, setShowStatus] = useState(false);

  const item = cva({
    base: {
      display: 'flex',
    },
    variants: {
      isBanned: {
        true: {
          color: 'status.negative',
          ml: '0.5rem',
        },
        false: {
          color: 'status.positive',
          ml: '0.5rem',
        },
      },
    },
  });
  const productInfo = useQuery({
    queryKey: ['productInfo', params.productId],
    queryFn: async () => {
      const res = await axios.get<ProductResponse>(
        `/store/${params.productId}`,
      );

      return res.data?.data ?? {};
    },
  });

  const onClickBan = (childUuid: string, banStatus: boolean) => {
    if (banStatus) {
      axios
        .delete<string>(
          `/store/banned-product/restrict/${childUuid}/${params.productId}`,
        )
        .then((res) => {
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

  return (
    <div>
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

      <Stack position={'relative'}>
        <GoodsDetail
          name={productInfo.data?.productName ?? '상품이 존재하지 않습니다.'}
          price={productInfo.data?.price ?? 0}
          url={productInfo.data?.productImage ?? ''}
        />
        {productInfo.data?.description.split(',').map((desc, id) => (
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
            position: 'sticky',
            bottom: '5rem',
            right: '0.5rem',
            bg: 'background.normal.normal/80',
            backdropFilter: 'auto',
            backdropBlur: 'sm',
          })}
        >
          <div
            className={css({
              mt: '1rem',
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: '0.5rem',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  })}
                >
                  <Image
                    src={childInfo.profileImageUrl}
                    width={30}
                    height={30}
                    alt={childInfo.name}
                    className={css({
                      borderRadius: '50%',
                      border: '1px solid',
                    })}
                  />
                  <p className={css({ textStyle: 'body2.reading.medium' })}>
                    {childInfo.name}
                  </p>
                </div>
                <p
                  className={item({
                    isBanned: childInfo.isBanned,
                  })}
                >
                  {childInfo.isBanned ? '제한 ' : '허용 '}
                </p>
                {childInfo.isBanned && (
                  <IonIcon
                    icon={banOutline}
                    className={css({
                      color: 'status.negative',
                      ml: '0.5rem',
                    })}
                  />
                )}
                {!childInfo.isBanned && (
                  <IonIcon
                    icon={ellipseOutline}
                    className={css({
                      color: 'status.positive',
                      ml: '0.5rem',
                    })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Stack>
    </div>
  );
};
export default Product;
