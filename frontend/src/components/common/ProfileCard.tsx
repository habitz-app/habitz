import Image from 'next/image';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

const ProfileCard = ({ name, point }: { name?: string; point: number }) => {
  return (
    <div
      className={css({
        display: 'flex',
        w: 'full',
        minH: '9.375rem',
        pl: '1rem',
        bg: 'primary.normal',
        justifyContent: 'space-between',
        borderRadius: '1.25rem',
        shadow: 'emphasize',
      })}
    >
      <Stack justify="space-between" py="1rem">
        <p className={css({ textStyle: 'title3.bold' })}>{name}</p>
        <span
          className={css({
            display: 'flex',
            flexDir: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          })}
        >
          <p
            className={css({
              textStyle: 'caption2.bold',
              color: 'label.neutral',
            })}
          >
            보유 해빗
          </p>
          <p
            className={css({
              textStyle: 'title3.bold',
              color: 'label.neutral',
              display: 'flex',
            })}
          >
            {point.toLocaleString()}
            <Image
              key="image"
              src="/coin.svg"
              width={24}
              height={24}
              className={css({
                ml: '0.2rem',
              })}
              alt="coin"
            />
          </p>
        </span>
      </Stack>
      <div
        className={css({
          display: 'flex',
          flexDir: 'column-reverse',
          h: '9.375rem',
          w: '9.375rem',
        })}
      >
        <Image src="/pet.svg" alt="pet" width="140" height="140" />
      </div>
    </div>
  );
};

export default ProfileCard;
