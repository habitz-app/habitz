import { css } from 'styled-system/css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const MissionContent = ({
  title,
  emoji,
  point,
  missionId,
}: {
  title: string;
  emoji: string;
  point: number;
  missionId: number;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`mission/${missionId}`)}
      className={css({
        width: '25rem',
        height: '80px',
        shadow: 'normal',
        borderRadius: '1rem',
        padding: '1rem',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'space-evenly',
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
  );
};

export default MissionContent;
