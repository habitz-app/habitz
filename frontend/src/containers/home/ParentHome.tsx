'use client';

import { Button } from '@/components/ui/button';
import usePoint from '@/queries/usePoint';
import {
  ChildListResponse,
  ChildRecentHistoryResponse,
} from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import {
  addCircleOutline,
  addOutline,
  chevronForwardOutline,
  notifications,
} from 'ionicons/icons';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-system/css';

const ParentHome = () => {
  const point = usePoint();

  const children = useQuery({
    queryKey: ['children'],
    queryFn: async () => {
      const res = await axios.get<ChildListResponse[]>('/family/childList');
      return res.data.data ?? [];
    },
  });

  const childHistoryQueries = children.data?.map((child) => {
    return {
      queryKey: ['child', 'history', child.uuid],
      queryFn: async () => {
        const res = await axios.get<ChildRecentHistoryResponse>(
          `/point/recent/history/${child.uuid}`,
        );
        return res.data.data ?? [];
      },
    };
  });

  const childHistories = useQueries({ queries: childHistoryQueries || [] });

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
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <strong
          className={css({
            fontFamily: 'yeoljeong',
            fontSize: '28px',
            lineHeight: '38.02px',
            color: 'primary.strong',
          })}
        >
          habitz
        </strong>
        <Button color="label.alternative" variant="link">
          <IonIcon
            icon={notifications}
            className={css({
              w: '24px',
              h: '24px',
            })}
          />
        </Button>
      </header>
      <main
        className={css({
          display: 'flex',
          w: 'full',
          flexDir: 'column',
          px: '1rem',
          gap: '1.25rem',
        })}
      >
        <section>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textStyle: 'headline1.bold',
            })}
          >
            <span>가족 해빗</span>
            <Link
              href="/manage/cash/charge"
              className={css({
                display: 'flex',
                alignItems: 'center',
                color: 'secondary.normal',
                textStyle: 'label1.normal.medium',
              })}
            >
              충전하기
              <IonIcon icon={chevronForwardOutline} />
            </Link>
          </div>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'flex-end',
              textStyle: 'heading2.bold',
              color: 'secondary.normal',
              gap: '0.25rem',
            })}
          >
            {Intl.NumberFormat('ko-kr').format(Number(point?.data ?? 0))}
            <Image src="/coin.svg" alt="coin" width={20} height={20} />
          </div>
        </section>
        <section
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '1.25rem',
          })}
        >
          <span
            className={css({
              textStyle: 'headline1.bold',
            })}
          >
            내 가족
          </span>
          {children.data &&
            children.data.map((child, index) => {
              const childHistory = childHistories[index];

              return (
                <div
                  key={child.uuid}
                  className={css({
                    shadow: 'normal',
                    w: 'full',
                    bgColor: 'background.elevated.normal',
                    display: 'flex',
                    flexDir: 'column',
                    borderRadius: '0.75rem',
                    p: '1rem',
                  })}
                >
                  <div
                    className={css({
                      display: 'flex',
                      w: 'full',
                      gap: '0.75rem',
                    })}
                  >
                    <div
                      className={css({
                        w: '6.25rem',
                        h: '6.25rem',
                        position: 'relative',
                      })}
                    >
                      <Image src={child.profileImage} alt={child.name} fill />
                    </div>
                    <div
                      className={css({
                        flex: 1,
                        display: 'flex',
                        flexDir: 'column',
                      })}
                    >
                      <div
                        className={css({
                          display: 'flex',
                          justifyContent: 'space-between',
                        })}
                      >
                        <span
                          className={css({
                            textStyle: 'headline1.bold',
                          })}
                        >
                          {child.name}
                        </span>
                        <span
                          className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textStyle: 'headline2.bold',
                            color: 'secondary.strong',
                          })}
                        >
                          {Intl.NumberFormat('ko-kr').format(
                            Number(child.point),
                          )}
                          <Image
                            src="/coin.svg"
                            alt="coin"
                            width={20}
                            height={20}
                          />
                        </span>
                      </div>
                      <div
                        className={css({
                          display: 'flex',
                          flexDir: 'column',
                          justifyContent: 'flex-end',
                          flex: 1,
                        })}
                      >
                        <span
                          className={css({
                            textStyle: 'label1.normal.bold',
                          })}
                        >
                          최근 활동
                        </span>
                        <span
                          className={css({
                            textStyle: 'label2.medium',
                            color: 'label.neutral',
                          })}
                        >
                          {childHistory.data ? (
                            <>
                              <span>{childHistory.data[0].emoji}</span>
                              {childHistory.data[0].historyInfo.content}
                            </>
                          ) : (
                            <>
                              <span>최근 활동이 없습니다.</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <Link
            href="/invite"
            className={css({
              shadow: 'normal',
              w: 'full',
              bgColor: 'background.elevated.normal',
              display: 'flex',
              flexDir: 'column',
              borderRadius: '0.75rem',
              justifyContent: 'center',
              alignItems: 'center',
              textStyle: 'label1.normal.bold',
              gap: '0.5rem',
              p: '1rem',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                w: '2.5rem',
                h: '2.5rem',
              })}
            >
              <IonIcon
                icon={addCircleOutline}
                className={css({
                  w: '2.5rem',
                  h: '2.5rem',
                  color: 'label.neutral',
                })}
              />
            </div>
            가족 추가하기
          </Link>
        </section>
      </main>
    </>
  );
};

export default ParentHome;
