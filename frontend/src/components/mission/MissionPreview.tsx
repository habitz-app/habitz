import { css, cva } from 'styled-system/css';
import { useRouter } from 'next/navigation';

const MissionPreview = ({
  missionId,
  title,
  status,
}: {
  missionId: number;
  title: string;
  status: 'EMPTY' | 'ACCEPT' | 'DECLINE' | 'PENDING';
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
      statusText = status;
  }

  const item = cva({
    base: {
      textStyle: 'caption1.medium',
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
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        w: 'full',
      })}
      onClick={() => router.push(`/mission/detail/${missionId}`)}
    >
      <p
        className={css({
          textStyle: 'headline1.bold',
          color: 'label.normal',
        })}
      >
        {title}
      </p>
      <p className={item({ visual: status })}>{statusText}</p>
    </div>
  );
};

export default MissionPreview;
