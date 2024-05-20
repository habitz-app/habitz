import { css } from 'styled-system/css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '../ui/button';

const PointCard = ({ point }: { point: number }) => {
  const router = useRouter();
  return (
    <div
      className={css({
        w: 'full',
        // h: '8rem',
        aspectRatio: '2.5',
        rounded: '1rem',
        backgroundColor: 'primary.normal',
        shadow: 'strong',
        p: '1.5rem',
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'space-between',
      })}
    >
      <p
        className={css({
          textStyle: 'title3.bold',
        })}
      >
        가족 해빗
      </p>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <p
          className={css({
            textStyle: 'heading1.bold',
            display: 'flex',
            alignItems: 'center',
          })}
        >
          {point}
          <Image
            key="image"
            src="/coin.svg"
            width={20}
            height={20}
            className={css({
              ml: '0.1rem',
            })}
            alt="coin"
          />
        </p>
        <Button
          className={css({
            w: '4.7rem',
            h: '2.5rem',
            backgroundColor: 'secondary.normal',
            rounded: '0.5rem',
          })}
          onClick={() => router.push('/manage/cash/charge')}
        >
          충전
        </Button>
      </div>
    </div>
  );
};

export default PointCard;
