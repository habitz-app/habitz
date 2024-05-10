import Image from 'next/image';
import { css, cva } from 'styled-system/css';

const MissionDetail = ({
  emoji,
  title,
  date,
  contents,
  status,
  point,
}: {
  emoji: string;
  title: string;
  date: string;
  contents: string;
  status: 'ACCEPT' | 'DECLINE' | 'EMPTY' | 'PENDING';
  point: number;
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
          <p
            className={css({ textStyle: 'title2.bold', color: 'label.normal' })}
          >
            {title}
          </p>
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
          <p
            className={item({
              visual: status,
            })}
          >
            {statusText}
          </p>
        </span>
      </div>
      <p
        className={css({
          textStyle: 'body2.normal.medium',
          color: 'label.neutral',
          mt: '1.25rem',
        })}
      >
        {contents}
      </p>
    </>
  );
};

export default MissionDetail;
