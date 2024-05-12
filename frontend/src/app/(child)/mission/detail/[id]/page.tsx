'use client';
import axios from '@/apis/axios';
import MissionDetail from '@/components/mission/MissionDetail';
import { Button } from '@/components/ui/button';
import { MissionDetailResponse } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';

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
  return (
    <div
      className={css({
        display: 'flex',
        flexDir: 'column',
        px: '1rem',
        gap: '1.25rem',
      })}
    >
      <MissionDetail
        emoji={mission.data?.mission.emoji || ''}
        title={mission.data?.mission.title || ''}
        date={mission.data?.mission.createdAt.split('T')[0] || ''}
        contents={mission.data?.mission.content || ''}
        point={mission.data?.mission.point || 0}
        status={mission.data?.mission.status || 'EMPTY'}
        image={
          mission.data?.recognition?.image || 'https://via.placeholder.com/250'
        }
        recognitionContent={mission.data?.recognition?.content || ''}
        approvalName={mission.data?.approval?.name || ''}
        approvalComment={mission.data?.approval?.comment || ''}
      />
      {mission.data?.mission.status === 'EMPTY' ? (
        <Button
          variant="solid"
          bgColor="primary.normal"
          textStyle="label1.normal.bold"
          color="label.neutral"
          w="full"
          shadow="strong"
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
