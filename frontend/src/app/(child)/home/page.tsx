'use client';
import ProfileCard from '@/components/common/ProfileCard';
import { Button } from '@/components/ui/button';
import { getUserData } from '@/hooks/useAuth';
import { MemberResponse } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import { notifications } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { PointAmount } from '@/types/point';
const HomePage = () => {
  const me = useQuery<MemberResponse>({
    queryKey: ['me'],
    queryFn: getUserData,
  });

  const getPoint = async () => {
    return await axios.get<PointAmount>('/point/amount').then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
  };

  const amount = useQuery({
    queryKey: ['point'],
    queryFn: getPoint,
  });

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
            안녕하세요, {me.data?.nickName}님!
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
        <ProfileCard point={amount.data?.point || 0} />
      </div>
    </>
  );
};

export default HomePage;
