'use client';
import { confirm } from '@/apis/toss';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GoodsCard from '@/components/store/GoodsCard';
import axios from '@/apis/axios';
import usePoint from '@/queries/usePoint';
import { css } from 'styled-system/css';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { Button } from '@/components/ui/button';
import { Player } from '@lottiefiles/react-lottie-player';
import { HStack } from 'styled-system/jsx';
import Image from 'next/image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PurchaseHistory } from '@/types/api/response';

const ChargeSuccess = ({ params }: { params: { id: number } }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get('amount');
  const point = usePoint();
  const queryClient = useQueryClient();

  const purchaseHistory = useQuery<PurchaseHistory>({
    queryKey: ['purchaseHistory', params.id],
    queryFn: async () => {
      const res = await axios.get<PurchaseHistory>(
        `/store/purchase-history/${params.id}`,
      );
      return res.data.data ?? {};
    },
  });

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
          zIndex: 999,
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
              onClick={() => router.push('/manage/cash/charge')}
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
              w: 'full',
              h: 'full',
              left: 0,
              textStyle: 'title3.bold',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            구매 성공
          </section>
        </div>
      </header>
      <main className={css({ px: '1rem', display: 'flex', flexDir: 'column' })}>
        <section
          className={css({
            borderBottom: '1px solid',
            borderColor: 'line.normal',
          })}
        >
          <Player
            autoplay
            loop
            src="/success.json"
            className={css({
              width: 'full',
            })}
          />
        </section>
        {purchaseHistory.data && (
          <>
            <section>
              <GoodsCard
                url={purchaseHistory.data.productInfo.productImage}
                name={purchaseHistory.data.productInfo.productName}
                brand={purchaseHistory.data.productInfo.brand}
              ></GoodsCard>
            </section>
            <section
              className={css({
                display: 'flex',
                flexDir: 'column',
                borderBottom: '1px solid',
                borderColor: 'line.normal',
                py: '1rem',
                gap: '0.5rem',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                })}
              >
                <span
                  className={css({
                    flex: 1,
                    textStyle: 'body1.normal.medium',
                    color: 'label.alternative',
                  })}
                >
                  상품 금액
                </span>
                <span
                  className={css({
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    textStyle: 'heading1.bold',
                    color: 'secondary.strong',
                  })}
                >
                  {purchaseHistory.data.price.toLocaleString()}
                  <Image
                    src="/coin.svg"
                    alt="coin image"
                    width={20}
                    height={20}
                    className={css({
                      ml: '0.25rem',
                    })}
                  />
                </span>
              </div>
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                })}
              >
                <span
                  className={css({
                    flex: 1,
                    textStyle: 'body1.normal.medium',
                    color: 'label.alternative',
                  })}
                >
                  구매 후 잔액
                </span>
                <span
                  className={css({
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    textStyle: 'heading1.bold',
                    color: 'secondary.strong',
                  })}
                >
                  {point.data?.toLocaleString()}
                  <Image
                    src="/coin.svg"
                    alt="coin image"
                    width={20}
                    height={20}
                    className={css({
                      ml: '0.25rem',
                    })}
                  />
                </span>
              </div>
            </section>
          </>
        )}
        <section
          className={css({
            display: 'flex',
            w: 'full',
            mt: '2.5rem',
            gap: '0.5rem',
          })}
        >
          <Button
            variant="solid"
            onClick={() => router.push('/store')}
            className={css({
              bgColor: 'primary.heavy',
              textStyle: 'body1.normal.regular',
              height: '3rem',
              flex: 1,
            })}
          >
            다른 상품 둘러보기
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className={css({
              borderColor: 'primary.heavy',
              borderWidth: '2px',
              textStyle: 'body1.normal.regular',
              height: '3rem',
              color: 'primary.heavy',
              flex: 1,
            })}
          >
            확인
          </Button>
        </section>
      </main>
    </>
  );
};

export default ChargeSuccess;
