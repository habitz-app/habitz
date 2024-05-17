import { css, cva } from 'styled-system/css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const MissionContent = ({
  title,
  emoji,
  point,
  missionId,
  status,
}: {
  title: string;
  emoji: string;
  point: number;
  missionId: number;
  status: 'ACCEPT' | 'DECLINE' | 'EMPTY' | 'PENDING';
}) => {
  const router = useRouter();
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

  return [
    status === 'ACCEPT' ? (
      <div
        onClick={() => router.push(`mission/detail/${missionId}`)}
        className={css({
          display: 'flex',
          flexDir: 'column',
          minW: '9.375rem',
          h: '11.25rem',
          borderRadius: '1.25rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
          px: '0.75rem',
          py: '0.5rem',
          bg: 'background.elevated.normal',
          gap: '0.5rem',
          shadow: 'normal',
        })}
      >
        <span
          className={css({
            display: 'flex',
            flexDir: 'column',
            w: 'full',
            h: '8.75rem',
            gap: '0.25rem',
            py: '0.75rem',
          })}
        >
          <p className={css({ fontSize: '3xl' })}>{emoji}</p>
          <p
            className={css({
              textStyle: 'headline1.bold',
              color: 'label.normal',
              lineClamp: '2',
              w: 'full',
            })}
          >
            {title}
          </p>
        </span>
        <p
          className={css({
            display: 'flex',
            w: 'full',
            textStyle: 'label1.normal.bold',
            color: 'label.alternative',
          })}
        >
          +{point.toLocaleString()}
          <Image
            key="image"
            src="/coin.svg"
            width={12}
            height={12}
            className={css({
              ml: '0.1rem',
            })}
            alt="coin"
          />
        </p>
      </div>
    ) : (
      <div
        onClick={() => router.push(`mission/detail/${missionId}`)}
        className={css({
          width: 'full',
          height: '80px',
          shadow: 'normal',
          borderRadius: '1rem',
          padding: '1rem',
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'space-evenly',
          bg: 'background.elevated.normal',
        })}
      >
        <p className={css({ textStyle: 'headline2.bold' })}>
          {emoji} {title}
        </p>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pl: '1.8rem',
            textStyle: 'label2.regular',
            color: 'gray.10',
          })}
        >
          <span
            className={css({
              display: 'flex',
            })}
          >
            {point.toLocaleString()}
            <Image
              key="image"
              src="/coin.svg"
              width={12}
              height={12}
              className={css({
                ml: '0.1rem',
              })}
              alt="coin"
            />
          </span>
          <p
            className={item({
              visual: status,
            })}
          >
            {statusText}
          </p>
        </div>
      </div>
    ),
  ];
};

export default MissionContent;
