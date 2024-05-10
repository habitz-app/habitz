'use client';
import ProfileCard from '@/components/common/ProfileCard';
import { Button } from '@/components/ui/button';
import { IonIcon } from '@ionic/react';
import { notifications } from 'ionicons/icons';
import { css } from 'styled-system/css';
const HomePage = () => {
  return (
    <>
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '2.5rem',
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
      <div
        className={css({
          display: 'flex',
          w: 'full',
          flexDir: 'column',
          gap: '1rem',
          px: '1rem',
        })}
      >
        <span
          className={css({
            display: 'flex',
            flexDir: 'column',
            alignItems: 'flex-start',
            pt: '1.25rem',
          })}
        >
          <p
            className={css({
              textStyle: 'caption1.medium',
              color: 'label.normal',
            })}
          >
            안녕하세요, 김첫째님!
          </p>
          <p
            className={css({
              textStyle: 'title3.bold',
              color: 'label.normal',
            })}
          >
            {new Date().toLocaleDateString('ko-KR', {
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </p>
        </span>
        <ProfileCard point={10450} />
      </div>
    </>
  );
};

export default HomePage;
