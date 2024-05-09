import { css } from 'styled-system/css';
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

  return [
    status === 'ACCEPT' ? (
      <div
        onClick={() => router.push(`mission/${missionId}`)}
        className={css({
          display: 'flex',
          flexDir: 'column',
          w: '9.375rem',
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
          +{point}
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
        onClick={() => router.push(`mission/${missionId}`)}
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
            pl: '1.8rem',
            textStyle: 'label2.regular',
            color: 'gray.10',
          })}
        >
          {point}
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
        </div>
      </div>
    ),
  ];
};

export default MissionContent;
