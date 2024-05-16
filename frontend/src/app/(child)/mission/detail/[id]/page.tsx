'use client';
import axios from '@/apis/axios';
import MissionDetail from '@/components/mission/MissionDetail';
import { Button } from '@/components/ui/button';
import { MissionDetailResponse } from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { chevronBackOutline } from 'ionicons/icons';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import Image from 'next/image';

const Page = ({ params }: { params: { id: string } }) => {
  const mission = useQuery<MissionDetailResponse>({
    queryKey: ['mission-detail', params.id],
    queryFn: async () => {
      const res = await axios.get<MissionDetailResponse>(
        `/mission/${params.id}`,
      );
      return res.data.data ?? {};
    },
  });
  const router = useRouter();
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        px: '1rem',
        gap: '1.25rem',
      })}
    >
      <header
        className={css({
          display: 'flex',
          position: 'sticky',
          height: '3.75rem',
          top: 0,
          bg: 'transparent',
          backdropFilter: 'auto',
          backdropBlur: 'sm',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <Button
          color="label.alternative"
          variant="link"
          onClick={() => {
            router.back();
          }}
        >
          <IonIcon
            icon={chevronBackOutline}
            className={css({
              w: '24px',
              h: '24px',
            })}
          />
        </Button>
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

      <MissionDetail mission={mission.data} />
      {mission.data?.mission.status === 'EMPTY' ? (
        <Button
          variant="solid"
          bgColor="primary.normal"
          textStyle="label1.normal.bold"
          color="label.neutral"
          w="full"
          shadow="strong"
          onClick={() => router.push(`/mission/authenticate/${params.id}`)}
        >
          지금 바로 미션 인증하기
        </Button>
      ) : (
        ''
      )}
    </div>
  );
};

export default Page;
