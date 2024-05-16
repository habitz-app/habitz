'use client';
import { confirm } from '@/apis/toss';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from '@/apis/axios';
import usePoint from '@/queries/usePoint';
import { css } from 'styled-system/css';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { Button } from '@/components/ui/button';
import { Player } from '@lottiefiles/react-lottie-player';
import { HStack } from 'styled-system/jsx';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

const ChargeSuccess = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get('amount');
  const point = usePoint();
  const queryClient = useQueryClient();

  useEffect(() => {
    const doConfirm = async (
      amount: string,
      orderId: string,
      paymentKey: string,
    ) => await confirm(amount, orderId, paymentKey);

    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    const paymentKey = searchParams.get('paymentKey');

    if (!orderId || !amount || !paymentKey) {
      alert('잘못된 접근입니다.');
      router.back();
      return;
    }

    const tossResponse = doConfirm(amount, orderId, paymentKey);

    tossResponse.then(async (res) => {
      const result = await axios
        .post<string>('/pay/confirm', {
          status: res.status,
          orderId: res.orderId,
          paymentKey: res.paymentKey,
          amount: res.card?.amount,
        })
        .then(() => {
          queryClient.invalidateQueries({
            queryKey: ['me', 'point'],
          });
        });
    });
  }, [queryClient, router, searchParams]);

  return (
    <>
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
            충전 성공
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
              충전 금액
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
              {Intl.NumberFormat('ko-KR').format(Number(amount))}
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
              충전 후 잔액
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
              {Intl.NumberFormat('ko-KR').format(Number(point?.data ?? 0))}
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
            onClick={() => router.push('/manage/cash/charge')}
            className={css({
              bgColor: 'primary.heavy',
              textStyle: 'body1.normal.regular',
              height: '3rem',
              flex: 1,
            })}
          >
            추가 충전하기
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
