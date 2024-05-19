import Image from 'next/image';
import { css, cva } from 'styled-system/css';
import * as Collapsible from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { MissionDetailResponse } from '@/types/api/response';
import { useRouter } from 'next/navigation';
const MissionDetail = ({
  mission,
}: {
  mission: MissionDetailResponse | undefined;
}) => {
  let statusText;
  switch (mission?.mission.status) {
    case 'EMPTY':
      statusText = '진행중';
      break;
    case 'ACCEPT':
      statusText = '완료';
      break;
    case 'PENDING':
      statusText = '승인 대기';
      break;
    case 'DECLINE':
      statusText = '승인 거절';
      break;
    default:
      statusText = '진행중';
  }

  const item = cva({
    base: {
      display: 'flex',
      textStyle: 'label1.normal.bold',
      minW: '3rem',
    },
    variants: {
      visual: {
        ACCEPT: {
          color: 'status.positive',
        },
        DECLINE: {
          color: 'status.negative',
        },
        EMPTY: {
          color: 'label.alternative',
        },
        PENDING: {
          color: 'status.cautionary',
        },
      },
    },
  });

  const router = useRouter();

  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          gap: '2.5rem',
          px: '1rem',
        })}
      >
        <span
          className={css({
            fontSize: '4.6875rem',
          })}
        >
          {mission?.mission.emoji || ''}
        </span>
        <span>
          <p
            className={css({
              textStyle: 'caption1.medium',
              color: 'label.alternative',
            })}
          >
            {new Date().toISOString().split('T')[0]}
          </p>
          <div
            className={css({
              display: 'flex',
              alignItems: 'flex-end',
              gap: '0.5rem',
            })}
          >
            <p
              className={css({
                display: 'flex',
                textStyle: 'title3.bold',
                color: 'label.normal',
              })}
            >
              {mission?.mission.title}
            </p>
            <p
              className={item({
                visual: mission?.mission?.status,
              })}
            >
              {statusText}
            </p>
            {mission?.mission.status === 'ACCEPT' ||
            mission?.mission.status === 'DECLINE' ? (
              <span
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.1rem',
                  justifyContent: 'flex-end',
                })}
              >
                <Image
                  src={mission.approval?.approver.image}
                  alt="profile"
                  width={16}
                  height={16}
                  style={{ borderRadius: '50%' }}
                />
                <p
                  className={css({
                    textStyle: 'label1.normal.bold',
                  })}
                >
                  {mission?.approval?.approver.name || ''}
                </p>
              </span>
            ) : (
              ''
            )}
          </div>
          <span
            className={css({
              display: 'flex',
              textStyle: 'label1.normal.bold',
              color: 'label.alternative',
              gap: '0.1rem',
            })}
          >
            +{mission?.mission.point.toLocaleString() || 0}
            <Image src="/coin.svg" alt="coin" width={16} height={16} />
          </span>
        </span>
      </div>
      <p
        className={css({
          textStyle: 'body2.normal.medium',
          color: 'label.neutral',
          px: '1rem',
        })}
      >
        {mission?.mission.content || ''}
      </p>
      <div
        className={css({
          display: 'flex ',
          flexDir: 'column',
          gap: '0.75rem',
          mt: '1.25rem',
          px: '1rem',
        })}
      >
        {mission?.approval?.comment ? (
          <Collapsible.Root>
            <Collapsible.Trigger asChild>
              <Button
                variant="solid"
                bgColor="primary.normal"
                textStyle="label1.normal.bold"
                color="label.neutral"
                w="full"
              >
                거절 사유 확인하기
              </Button>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  gap: '0.5rem',
                  p: '1rem',
                  bg: 'background.normal.alternative',
                })}
              >
                <p
                  className={css({
                    textStyle: 'heading2.bold',
                    color: 'label.normal',
                  })}
                >
                  {mission?.approval?.approver.name}님의 거절 사유
                </p>
                <p
                  className={css({
                    textStyle: 'body2.normal.medium',
                    color: 'label.neutral',
                  })}
                >
                  {mission?.approval?.comment}
                </p>
                <Button
                  variant="solid"
                  bgColor="primary.normal"
                  textStyle="label1.normal.bold"
                  color="label.neutral"
                  w="full"
                >
                  다시 인증하기
                </Button>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        ) : mission?.mission.status === 'DECLINE' ? (
          <Button
            variant="solid"
            bgColor="primary.normal"
            textStyle="label1.normal.bold"
            color="label.neutral"
            w="full"
            onClick={() => {
              router.push(
                `/mission/authenticate/${mission?.mission.missionId}`,
              );
            }}
          >
            다시 인증하기
          </Button>
        ) : (
          ''
        )}
        <p
          className={css({ textStyle: 'heading2.bold', color: 'label.normal' })}
        >
          미션 인증 내역
        </p>

        <div
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '1rem',
          })}
        >
          {mission?.recognition && mission?.recognition?.image ? (
            <Image
              src={`${mission?.recognition?.image}`}
              alt="image"
              width={300}
              height={200}
              style={{ alignSelf: 'center' }}
            />
          ) : (
            <Image
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Dotted%20Line%20Face.png"
              alt="image"
              width={150}
              height={150}
              style={{ alignSelf: 'center' }}
            />
          )}
          {mission?.recognition?.content ? (
            <div>
              <p
                className={css({
                  textStyle: 'heading2.bold',
                  alignSelf: 'flex-start',
                  bg: 'background.normal.alternative',
                })}
              >
                {mission?.recognition?.content}
              </p>
            </div>
          ) : (
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.625rem',
                p: '0.625rem',
                textStyle: 'body1.reading.bold',
              })}
            >
              <span
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
              >
                <p>앗, 인증 내역이 없어요...</p>
                <p>지금 인증하고 포인트를 받아요!</p>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MissionDetail;
