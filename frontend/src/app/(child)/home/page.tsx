'use client';
import ProfileCard from '@/components/common/ProfileCard';
import { Button } from '@/components/ui/button';
import { useMe } from '@/hooks/useAuth';
import { MissionResponse } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import axios from '@/apis/axios';
import { chevronForwardOutline, notifications } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { PointAmount } from '@/types/point';
import Link from 'next/link';
import MissionPreview from '@/components/mission/MissionPreview';
const HomePage = () => {
  const date = new Date().toISOString().split('T')[0];

  const me = useMe();

  const getPoint = async () => {
    return await axios.get<PointAmount>('/point/amount').then((res) => {
      return res.data.data;
    });
  };

  const amount = useQuery({
    queryKey: ['point'],
    queryFn: getPoint,
  });

  const getMission = async () => {
    return await axios
      .get<MissionResponse>(`/mission/list?date=${date}`)
      .then((res) => {
        return res.data.data;
      });
  };

  const mission = useQuery({
    queryKey: ['mission'],
    queryFn: getMission,
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
        <ProfileCard name="" point={amount.data?.point || 0} />
        <section
          className={css({
            display: 'flex',
            flexDir: 'column',
            gap: '0.625rem',
          })}
        >
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: '1.25rem',
            })}
          >
            <p
              className={css({
                textStyle: 'title3.bold',
              })}
            >
              오늘의 미션
            </p>
            <Link href={'/mission'}>
              <IonIcon icon={chevronForwardOutline} />
            </Link>
          </div>
          {Array.isArray(mission.data) &&
            mission.data.map(function (m) {
              return (
                <MissionPreview
                  missionId={m.missionId}
                  status={m.status}
                  title={m.title}
                  key={m.missionId}
                />
              );
            })}
        </section>
      </div>
    </>
  );
};

export default HomePage;
