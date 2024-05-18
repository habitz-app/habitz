'use client';
import axios from '@/apis/axios';
import GoodsCard from '@/components/store/GoodsCard';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import type { ProductResponse, PurchaseResponse } from '@/types/api/response';
import usePoint from '@/queries/usePoint';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Bill = ({ params }: { params: { id: number } }) => {
  const productInfo = useQuery({
    queryKey: ['productInfo', params.id],
    queryFn: async () => {
      const res = await axios.get<ProductResponse>(`/store/${params.id}`);

      return res.data?.data ?? {};
    },
  });

  const router = useRouter();

  const point = usePoint();

  const calcChange = (
    price: string | number | undefined,
    point: string | number | undefined,
  ) => {
    return Number(point) - Number(price);
  };

  const checkout = async () => {
    if (!productInfo.data || !point.data) return;

    if (productInfo.data.price > point.data) {
      alert('포인트가 부족합니다.');
      return;
    }

    await axios
      .post<PurchaseResponse>('/store/purchase', {
        productId: params.id,
      })
      .then((res) => {
        if (res.status === 200) {
          alert('구매가 완료되었습니다.');
          router.push(`/store/receipt/${res.data.data.purchaseId}`);
        } else throw new Error('구매에 실패했습니다.');
      })
      .catch((err) => {
        alert(err);
      });
  };

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
          justifyContent: 'flex-start',
          alignItems: 'center',
        })}
      >
        <div
          className={css({
            position: 'relative',
            display: 'flex',
            w: 'full',
            h: 'full',
          })}
        >
          <div
            className={css({
              zIndex: '10',
              display: 'flex',
            })}
          >
            <Button
              color="label.alternative"
              variant="link"
              onClick={() => {
                router.push(`/store/${params.id}`);
              }}
            >
              <IonIcon
                icon={chevronBackOutline}
                className={css({
                  w: '24px',
                  h: '24px',
                })}
              />
            </Button>
          </div>
          <section
            className={css({
              width: 'full',
              height: 'full',
              left: 0,
              textStyle: 'title3.bold',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            구매하기
          </section>
        </div>
      </header>
      <Stack
        w="full"
        justify="space-between"
        align="center"
        gap="1.25rem"
        px="1rem"
        py="0.75rem"
      >
        {productInfo.data && (
          <GoodsCard
            url={productInfo.data.productImage}
            name={productInfo.data.productName}
            brand={productInfo.data.brand}
            price={productInfo.data.price}
          ></GoodsCard>
        )}
        <section
          className={css({
            display: 'flex',
            flexDir: 'column',
            w: 'full',
            px: '1rem',
            gap: '0.25rem',
          })}
        >
          <div
            className={css({
              display: 'flex',
              w: 'full',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <p
              className={css({
                textStyle: 'label2.medium',
                color: 'label.alternative',
              })}
            >
              보유 해비츠
            </p>
            <p
              className={css({
                display: 'flex',
                gap: '0.25rem',
                textStyle: 'headline1.bold',
              })}
            >
              {point.data?.toLocaleString()}
              <Image src="/coin.svg" width={20} height={20} alt="coin" />
            </p>
          </div>
          <div
            className={css({
              display: 'flex',
              w: 'full',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <p
              className={css({
                textStyle: 'label2.medium',
                color: 'label.alternative',
              })}
            >
              결제 금액
            </p>
            <p
              className={css({
                display: 'flex',
                gap: '0.25rem',
                textStyle: 'headline1.bold',
              })}
            >
              {productInfo.data?.price.toLocaleString()}
              <Image src="/coin.svg" width={20} height={20} alt="coin" />
            </p>
          </div>
          <hr
            className={css({
              w: 'full',
              borderWidth: '1px',
              my: '0.75rem',
            })}
          />
          <div
            className={css({
              display: 'flex',
              w: 'full',
              justifyContent: 'space-between',
              alignItems: 'center',
            })}
          >
            <p
              className={css({
                textStyle: 'label2.medium',
                color: 'label.alternative',
              })}
            >
              잔액
            </p>
            <p
              className={css({
                display: 'flex',
                gap: '0.25rem',
                textStyle: 'headline1.bold',
              })}
            >
              {calcChange(productInfo.data?.price, point.data).toLocaleString()}
              <Image src="/coin.svg" width={20} height={20} alt="coin" />
            </p>
          </div>
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              ps: '1rem',
              h: '2.5rem',
              mt: '1.25rem',
              borderRadius: '0.5rem',
              bgColor: 'background.normal.alternative',
            })}
          >
            <p
              className={css({
                textStyle: 'caption1.medium',
              })}
            >
              주문내용을 확인했으며, 결제 진행에 동의합니다.
            </p>
          </div>
        </section>
        <Button
          className={css({
            w: 'full',
            color: 'label.normal',
            bgColor: 'primary.normal',
          })}
          onClick={checkout}
        >
          결제하기
        </Button>
      </Stack>
    </>
  );
};

export default Bill;
