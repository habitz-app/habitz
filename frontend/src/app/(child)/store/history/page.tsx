'use client';

import axios from '@/apis/axios';
import { Button } from '@/components/ui/button';
import { PurchaseHistoryResponse } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { chevronBackOutline } from 'ionicons/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';

const StoreHistory = () => {
  const getHistory = async () => {
    return await axios
      .get<PurchaseHistoryResponse>('store/purchase-history')
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      });
  };

  const history = useQuery<PurchaseHistoryResponse>({
    queryKey: ['purchase-history'],
    queryFn: getHistory,
  });

  const router = useRouter();

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
                router.back();
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
            구매 내역
          </section>
        </div>
      </header>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: 'full',
          gap: '1rem',
          px: '1rem',
        })}
      >
        {Array.isArray(history.data) &&
          history.data?.map((item) => (
            <div
              key={item.purchaseId}
              className={css({
                display: 'flex',
                flexDir: 'column',
                gap: '0.75rem',
                cursor: 'pointer',
              })}
              onClick={() =>
                router.push(`/store/${item.productInfo.productId}`)
              }
            >
              <p
                className={css({
                  textStyle: 'caption1.bold',
                  color: 'label.alternative',
                })}
              >
                주문일 {item.purchaseDate.substring(0, 19).replace('T', ' ')}
              </p>
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  bg: 'background.elevated.normal',
                  borderRadius: '1.25rem',
                  p: '0.625rem',
                  gap: '0.625rem',
                })}
              >
                <div
                  className={css({
                    display: 'flex',
                    gap: '0.75rem',
                  })}
                >
                  <Image
                    src={item.productInfo.productImage}
                    alt={'product image'}
                    width={75}
                    height={75}
                  />
                  <span>
                    <p
                      className={css({
                        textStyle: 'caption1.medium',
                        color: 'label.alternative',
                      })}
                    >
                      {item.productInfo.brand}
                    </p>
                    <p
                      className={css({
                        textStyle: 'label2.bold',
                        color: 'label.normal',
                        wordBreak: 'break-word',
                        lineClamp: 2,
                      })}
                    >
                      {item.productInfo.productName}
                    </p>
                    <p
                      className={css({
                        textStyle: 'body2.normal.medium',
                        color: 'label.normal',
                      })}
                    >
                      <div
                        className={css({
                          display: 'flex',
                          gap: '0.125rem',
                        })}
                      >
                        {item.price.toLocaleString()}
                        <Image
                          src="/coin.svg"
                          alt="coin"
                          width={20}
                          height={20}
                        />
                      </div>
                    </p>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default StoreHistory;
