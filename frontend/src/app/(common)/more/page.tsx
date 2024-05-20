'use client';

import { Button } from '@/components/ui/button';
import { useAuthWithRoles, useMe } from '@/hooks/useAuth';
import { IonIcon } from '@ionic/react';
import { css } from 'styled-system/css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import { PointAmountResponse } from '@/types/api/response';
import Link from 'next/link';
import useAuthStore from '@/stores/authStore';

const More = () => {
  const router = useRouter();
  const setAccessToken = useAuthStore.use.setAccessToken();

  const me = useMe();
  const point = useQuery<number>({
    queryKey: ['me', 'point'],
    queryFn: async () => {
      const res = await axios.get<PointAmountResponse>('/point/amount');
      return res.data.data.point ?? 0;
    },
  });

  const handleLogout = async () => {
    await axios.get('/member/logout').then(() => {
      setAccessToken('');
      router.push('/login');
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
            더보기
          </section>
        </div>
      </header>
      <main
        className={css({
          display: 'flex',
          flexDir: 'column',
          px: '1rem',
        })}
      >
        {me?.data && (
          <>
            <section
              className={css({
                display: 'flex',
                alignItems: 'flex-end',
                textStyle: 'title2.bold',
                mb: '1.25rem',
                gap: '0.25rem',
              })}
            >
              {me.data.name}
              <span
                className={css({
                  textStyle: 'label1.normal.medium',
                })}
              >
                {me.data.email}
              </span>
            </section>
            <section
              className={css({
                w: 'full',
                bgColor: 'primary.normal',
                p: '1rem',
                borderRadius: '0.75rem',
                shadow: 'normal',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                })}
              >
                <Image src="/coin.svg" width={24} height={24} alt="coin" />
                <span
                  className={css({
                    textStyle: 'heading2.bold',
                    ml: '0.25rem',
                    flex: 1,
                  })}
                >
                  {Intl.NumberFormat('ko-KR').format(point?.data ?? 0)}
                </span>
                {me.data.role === 'PARENT' && (
                  <Link
                    href="/manage/cash/charge"
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textStyle: 'label2.bold',
                      px: '0.5rem',
                      borderRadius: '0.75rem',
                      borderWidth: '2px',
                      borderColor: 'label.disable',
                      bgColor: 'primary.strong',
                    })}
                    scroll={false}
                  >
                    충전하기
                  </Link>
                )}
              </div>
            </section>
            <section
              className={css({
                mt: '1.25rem',
              })}
            >
              <ul>
                <li
                  className={css({
                    display: 'flex',
                    h: '2.5rem',
                    w: 'full',
                    textStyle: 'label1.normal.bold',
                  })}
                >
                  <Link
                    href="/mypage"
                    className={css({
                      display: 'flex',
                      w: 'full',
                      h: 'full',
                      justifyContent: 'start',
                      alignItems: 'center',
                    })}
                    scroll={false}
                  >
                    내 정보
                  </Link>
                </li>
                <li
                  className={css({
                    display: 'flex',
                    h: '2.5rem',
                    w: 'full',
                    textStyle: 'label1.normal.bold',
                  })}
                >
                  <Link
                    href="/family"
                    className={css({
                      display: 'flex',
                      w: 'full',
                      h: 'full',
                      justifyContent: 'start',
                      alignItems: 'center',
                    })}
                    scroll={false}
                  >
                    우리 가족
                  </Link>
                </li>
                <li
                  className={css({
                    display: 'flex',
                    h: '2.5rem',
                    w: 'full',
                    textStyle: 'label1.normal.bold',
                  })}
                >
                  <Link
                    href="/point"
                    className={css({
                      display: 'flex',
                      w: 'full',
                      h: 'full',
                      justifyContent: 'start',
                      alignItems: 'center',
                    })}
                    scroll={false}
                  >
                    내 포인트
                  </Link>
                </li>
                {me.data.role === 'CHILD' && (
                  <li
                    className={css({
                      display: 'flex',
                      h: '2.5rem',
                      w: 'full',
                      textStyle: 'label1.normal.bold',
                    })}
                  >
                    <Link
                      href="/store/history"
                      className={css({
                        display: 'flex',
                        w: 'full',
                        h: 'full',
                        justifyContent: 'start',
                        alignItems: 'center',
                      })}
                      scroll={false}
                    >
                      구매 내역
                    </Link>
                  </li>
                )}
                <li
                  className={css({
                    display: 'flex',
                    h: '2.5rem',
                    w: 'full',
                    textStyle: 'label1.normal.bold',
                  })}
                >
                  <Button
                    variant="link"
                    className={css({
                      color: 'status.negative',
                      w: 'full',
                      h: 'full',
                      justifyContent: 'start',
                    })}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </li>
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default More;
