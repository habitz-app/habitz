import Image from 'next/image';
import { css, cva } from 'styled-system/css';
import * as Collapsible from '@/components/ui/collapsible';
import { Button } from '../ui/button';
import { IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
const MissionDetail = ({
  emoji,
  title,
  date,
  contents,
  status,
  point,
  image,
  recognitionContent,
  approvalName,
  approvalComment,
}: {
  emoji: string;
  title: string;
  date: string;
  contents: string;
  status: 'ACCEPT' | 'DECLINE' | 'EMPTY' | 'PENDING';
  point: number;
  image?: string;
  recognitionContent?: string;
  approvalName?: string;
  approvalComment?: string;
}) => {
  let statusText;
  switch (status) {
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

  return (
    <>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          gap: '2.5rem',
          mt: '2.5rem',
        })}
      >
        <span
          className={css({
            fontSize: '4.6875rem',
          })}
        >
          {emoji}
        </span>
        <span>
          <p
            className={css({
              textStyle: 'caption1.medium',
              color: 'label.alternative',
            })}
          >
            {date}
          </p>
          <div
            className={css({
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
            })}
          >
            <p
              className={css({
                display: 'flex',
                textStyle: 'title2.bold',
                color: 'label.normal',
              })}
            >
              {title}
            </p>
            <p
              className={item({
                visual: status,
              })}
            >
              {statusText}
            </p>
            {status === 'ACCEPT' || status === 'DECLINE' ? (
              <span
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.1rem',
                  justifyContent: 'flex-end',
                })}
              >
                <IonIcon icon={personCircleOutline} size="18" />
                <p
                  className={css({
                    textStyle: 'label1.normal.bold',
                  })}
                >
                  {approvalName}
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
            +{point} <Image src="/coin.svg" alt="coin" width={16} height={16} />
          </span>
        </span>
      </div>
      <p
        className={css({
          textStyle: 'body2.normal.medium',
          color: 'label.neutral',
        })}
      >
        {contents}
      </p>

      <div
        className={css({
          display: 'flex ',
          flexDir: 'column',
          gap: '0.75rem',
          mt: '1.25rem',
        })}
      >
        {approvalComment ? (
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
                  {approvalName}님의 거절 사유
                </p>
                <p
                  className={css({
                    textStyle: 'body2.normal.medium',
                    color: 'label.neutral',
                  })}
                >
                  {approvalComment}
                </p>
                <Button
                  variant="solid"
                  bgColor="primary.normal"
                  textStyle="label1.normal.bold"
                  color="label.neutral"
                  w="full"
                >
                  재인증하기
                </Button>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        ) : status === 'DECLINE' ? (
          <Button
            variant="solid"
            bgColor="primary.normal"
            textStyle="label1.normal.bold"
            color="label.neutral"
            w="full"
          >
            재인증하기
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
          <Image
            src={`${image}`}
            alt="image"
            width={150}
            height={150}
            style={{ alignSelf: 'center' }}
          />
          {recognitionContent ? (
            <div>
              <p
                className={css({
                  textStyle: 'heading2.bold',
                  alignSelf: 'flex-start',
                  bg: 'background.normal.alternative',
                })}
              >
                {recognitionContent}
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
          {/* approvalName이 존재할 때만 Collapsible 컴포넌트 렌더링 */}
        </div>
      </div>
    </>
  );
};

export default MissionDetail;
