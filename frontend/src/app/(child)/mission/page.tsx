'use client';
import { Button } from '@/components/ui/button';
import { css } from 'styled-system/css';
import Image from 'next/image';
import MissionContent from '@/components/mission/MissionContent';
import { useQuery } from '@tanstack/react-query';
import { MissionResponse } from '@/types/api/response';
import axios from '@/apis/axios';
const MissionPage = () => {
  const date = new Date().toISOString().split('T')[0];
  const getMission = async () => {
    return await axios
      .get<MissionResponse>(`/mission/list?date=${date}`)
      .then((res) => {
        return res.data.data;
      });
  };

  const missionList = useQuery({
    queryKey: ['mission-list'],
    queryFn: getMission,
  });
  return (
    <>
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'background.normal.normal/80',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          px: '1rem',
          justifyContent: 'flex-end',
          alignItems: 'center',
        })}
      >
        <Button color="label.alternative" variant="link">
          <Image
            key="history"
            src="/history.svg"
            alt="history"
            width="19"
            height="19"
          ></Image>
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
          className={css({ textStyle: 'title2.bold', color: 'label.normal' })}
        >
          미션
        </span>
        <p
          className={css({
            textStyle: 'title3.bold',
            color: 'label.normal',
          })}
        >
          진행 중
        </p>
        {Array.isArray(missionList.data) &&
          missionList.data.map(function (m) {
            if (m.status !== 'ACCEPT') {
              return (
                <MissionContent
                  missionId={m.missionId}
                  status={m.status}
                  title={m.title}
                  key={m.missionId}
                  emoji={m.emoji}
                  point={m.point}
                />
              );
            }
          })}
        <p
          className={css({
            textStyle: 'title3.bold',
            color: 'label.normal',
          })}
        >
          완료
        </p>
        <div className={css({})}>
          <section
            className={css({
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              pb: '0.5rem',
            })}
          >
            {Array.isArray(missionList.data) &&
              missionList.data.map(function (m) {
                if (m.status === 'ACCEPT') {
                  return (
                    <MissionContent
                      missionId={m.missionId}
                      status={m.status}
                      title={m.title}
                      key={m.missionId}
                      emoji={m.emoji}
                      point={m.point}
                    />
                  );
                }
              })}
          </section>
        </div>
      </div>
    </>
  );
};

export default MissionPage;
