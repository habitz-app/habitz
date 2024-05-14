'use client';
import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HStack } from 'styled-system/jsx';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import axios from '@/apis/axios';
import { OrderResponse } from '@/types/api/response';
import usePoint from '@/queries/usePoint';
import { css } from 'styled-system/css';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Charge = () => {
  const MAX_CHARGE_AMOUNT = 1_000_000;
  const MIN_CHARGE_AMOUNT = 1_000;

  const router = useRouter();
  const point = usePoint();
  const dummyChargeButtonArray: number[] = [10000, 30000, 50000, 100000];
  const [chargeAmount, setChargeAmount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;

    const numericValue = Number(inputValue.replace(/\D/g, ''));

    if (numericValue > MAX_CHARGE_AMOUNT) {
      setChargeAmount(MAX_CHARGE_AMOUNT);
      changeInputValue(MAX_CHARGE_AMOUNT);
      return;
    }
    setChargeAmount(numericValue);
    changeInputValue(numericValue);
  };

  const changeInputValue = (value: number) => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = toFormattedNumber(value);
  };

  const toFormattedNumber = (value: number) => {
    return Intl.NumberFormat('ko-KR').format(value);
  };

  useEffect(() => {
    changeInputValue(chargeAmount);
  }, [chargeAmount]);
  const handleClick = async () => {
    if (chargeAmount < MIN_CHARGE_AMOUNT) {
      alert('최소 충전 금액은 1,000원 입니다.');
      return;
    }

    await axios
      .post<OrderResponse>('/pay/get-order-id', {
        amount: chargeAmount,
      })
      .then(async (res) => {
        const orderId = res.data.data.orderId;
        const tossPayments = await loadTossPayments(
          process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? '',
        );
        await tossPayments.requestPayment('카드', {
          amount: chargeAmount,
          orderId: orderId,
          orderName: '(주)해비츠',
          successUrl: `${process.env.NEXT_PUBLIC_TOSS_REDIRECT_URL}/manage/cash/charge/success`,
          failUrl: `${process.env.NEXT_PUBLIC_TOSS_REDIRECT_URL}/manage/cash/charge/fail`,
        });
      });
  };

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
            zIndex: '10',
            display: 'flex',
          })}
        >
          <Button
            color="label.alternative"
            variant="link"
            onClick={() => router.back()}
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
        <div
          className={css({
            position: 'relative',
            display: 'flex',
            w: 'full',
            h: 'full',
          })}
        >
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
            충전하기
          </section>
        </div>
      </header>
      <main
        className={css({
          mt: '5rem',
          px: '1rem',
        })}
      >
        <section
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '1rem',
          })}
        >
          <Image src="/coin.svg" alt="coin image" width={75} height={75} />
          <h1
            className={css({
              textStyle: 'title3.bold',
            })}
          >
            얼마를 충전할까요?
          </h1>
        </section>
        <section>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleClick();
            }}
          >
            <section
              className={css({
                display: 'flex',
                gap: '0.5rem',
                w: 'full',
              })}
            >
              <input
                type="text"
                placeholder="충전 금액"
                inputMode="numeric"
                onChange={handleInputChange}
                ref={inputRef}
                className={css({
                  border: 'none',
                  textAlign: 'end',
                  flex: 1,
                  w: 'full',
                  textStyle: 'title1.bold',
                  '&::-webkit-inner-spin-button': {
                    appearance: 'none',
                  },
                  '&::-webkit-outer-spin-button': {
                    appearance: 'none',
                  },
                  _focus: {
                    outline: 'none',
                  },
                })}
              />
              <span
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                })}
              >
                <Image
                  src="/coin.svg"
                  alt="coin image"
                  width={24}
                  height={24}
                />
              </span>
            </section>
            <HStack
              className={css({
                w: 'full',
                h: '2.5rem',
                justifyContent: 'flex-end',
                gap: '0.5rem',
              })}
            >
              {dummyChargeButtonArray.map((amount, index) => {
                const handleButtonClick = (plus: number) => {
                  setChargeAmount((prev) => {
                    const next = prev + plus;

                    if (next > MAX_CHARGE_AMOUNT) {
                      alert('1회 최대 충전 가능 금액은 100만원 입니다.');
                    }

                    return next > MAX_CHARGE_AMOUNT ? MAX_CHARGE_AMOUNT : next;
                  });
                };

                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleButtonClick(amount)}
                    className={css({
                      borderWidth: '1px',
                      borderColor: 'label.neutral',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      w: '3.75rem',
                    })}
                  >
                    +{amount / 10000}만
                  </button>
                );
              })}
            </HStack>
            <section
              className={css({
                my: '2.5rem',
                display: 'flex',
                flexDir: 'column',
                gap: '0.5rem',
              })}
            >
              <HStack
                className={css({
                  justifyContent: 'space-between',
                  textStyle: 'headline2.regular',
                })}
              >
                <span>내 보유 포인트</span>
                <span
                  className={css({
                    textStyle: 'headline2.bold',
                  })}
                >
                  {toFormattedNumber(point?.data ?? 0)}
                </span>
              </HStack>
              <HStack
                className={css({
                  justifyContent: 'space-between',
                  textStyle: 'headline2.regular',
                })}
              >
                <span>충전 후 포인트</span>
                <span
                  className={css({
                    textStyle: 'headline2.bold',
                  })}
                >
                  {toFormattedNumber((point?.data ?? 0) + chargeAmount)}
                </span>
              </HStack>
            </section>
            <Button
              type="submit"
              width="full"
              bgColor="primary.normal"
              color="label.normal"
              _hover={{ bgColor: 'primary.strong' }}
            >
              충전하기
            </Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Charge;
