'use client';
import { MissionDetailResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DeclineModal from '@/components/mission/DeclineModal';
import { useRouter } from 'next/navigation';
import ApprovalProfile from '@/components/mission/ApprovalProfile';

const ParentMissionDetail = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const statusMap = {
    EMPTY: '미션 중',
    ACCEPT: '미션 완료',
    DECLINE: '승인 거절',
    PENDING: '미션 승인',
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getMissionDetail = async (id: number) => {
    const res = await axios.get<MissionDetailResponse>(`/mission/${id}`);
    console.log('Get MissionDetail Success! 😊');
    return res.data.data;
  };

  const postMissionApprove = async (
    id: number,
    status: 'ACCEPT' | 'DECLINE',
    content?: string,
  ) => {
    const res = await axios
      .post<MissionDetailResponse>('/mission/approve', {
        missionId: id,
        status: status,
        content: content ? content : null,
      })
      .then((res) => {
        console.log('Post MissionApproval Success! 😊', res);
        router.push('/manage/main');
      })
      .catch((error) => {
        alert('Post MissionApproval Fail! 😢 \n' + error.response.data.message);
      });
  };

  const { data: missionDetail, refetch: refetchMissionDetail } =
    useQuery<MissionDetailResponse>({
      queryKey: ['MissionDetail', params.id],
      queryFn: () => getMissionDetail(params.id),
    });

  return (
    <Stack
      px="1rem"
      py="1.25rem"
      justify="space-between"
      flexGrow={1}
      minH="full"
      textStyle="title2.bold"
      align="center"
      position="relative"
    >
      <p className={css({ w: 'full' })}>
        {missionDetail ? statusMap[missionDetail.mission.status] : ''}
      </p>
      <Stack w="full">
        <p className={css({ textStyle: 'title3.bold' })}>
          {missionDetail?.mission?.title}
        </p>
        <HStack justify={'space-between'}>
          <HStack>
            <p className={css({ color: 'accent.lime' })}>
              + {missionDetail?.mission.point}
            </p>
            <Image src="/coin.svg" alt="coin" width="30" height="30" />
          </HStack>
          {missionDetail?.approval ? (
            <ApprovalProfile name={missionDetail?.approval?.name} />
          ) : null}
        </HStack>
      </Stack>
      <Stack justify="space-between" align="center">
        <Image
          src={missionDetail ? missionDetail.recognition?.image : ''}
          width={0}
          height={0}
          sizes="100vw"
          alt="인증 이미지"
          className={css({
            w: 'full',
            h: 'auto',
            rounded: '1rem',
            shadow: 'md',
          })}
        />
        <p className={css({ textStyle: 'heading1.medium' })}>
          {missionDetail?.recognition?.content}
        </p>
      </Stack>
      <HStack w="full" justify="space-around" gap="1.125rem">
        <Button
          w="50%"
          h="3rem"
          rounded="0.875rem"
          bg="blue.500"
          textStyle="headline1.bold"
          onClick={() => postMissionApprove(params.id, 'ACCEPT')}
        >
          승인
        </Button>
        <Button
          w="50%"
          h="3rem"
          rounded="0.875rem"
          bg="red.500"
          textStyle="headline1.bold"
          onClick={() => setIsModalVisible(!isModalVisible)}
        >
          거절
        </Button>
      </HStack>
      {missionDetail?.mission.status !== 'ACCEPT' ? (
        <div
          className={css({
            w: 'full',
            display: 'flex',
            justifyContent: 'flex-end',
          })}
        >
          <ApprovalProfile
            name={missionDetail?.mission.createdBy}
          ></ApprovalProfile>
        </div>
      ) : null}
      {isModalVisible ? (
        <DeclineModal
          cancelHandler={() => setIsModalVisible(false)}
          declineHandler={(val: string) =>
            postMissionApprove(params.id, 'DECLINE', val)
          }
        ></DeclineModal>
      ) : null}
    </Stack>
  );
};
export default ParentMissionDetail;
