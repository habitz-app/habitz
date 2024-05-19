'use client';
import { MissionDetailResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DeclineModal from '@/components/mission/DeclineModal';
import { useRouter } from 'next/navigation';
import ApprovalProfile from '@/components/mission/ApprovalProfile';
import { IonIcon } from '@ionic/react';
import {
  arrowBackOutline,
  chevronBackOutline,
  ellipsisVertical,
} from 'ionicons/icons';
import { IconButton } from '@/components/ui/icon-button';
import * as Menu from '@/components/ui/menu';
import { MenuSelectionDetails } from '@ark-ui/react';
import Header from '@/components/common/Header';
const MenuComponent = ({
  updateHandler,
  ...props
}: {
  updateHandler: () => void;
  props?: Menu.RootProps;
}) => {
  return (
    <Menu.Root
      {...props}
      onSelect={(details: MenuSelectionDetails) => {
        if (details.value === 'update') {
          console.log('😉 Update!');
          updateHandler();
        }
      }}
    >
      <Menu.Trigger asChild>
        <IconButton variant={'link'} size="sm">
          <IonIcon
            icon={ellipsisVertical}
            className={css({
              color: 'label.alternative',
              fontSize: '1.5rem',
            })}
          ></IonIcon>
        </IconButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content w="auto">
          <Menu.ItemGroup id="group">
            <Menu.Item
              id="update"
              onClick={() => {
                console.log('😉');
              }}
            >
              수정
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

const ParentMissionDetail = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries({
          queryKey: ['MissionDetail', params.id],
        });
        router.push('/manage/mission');
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
    <>
      <Header isBack />
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
        <Stack w="full" gap="1.25rem">
          <HStack w="full">
            <p className={css({ w: 'full' })}>
              {missionDetail ? statusMap[missionDetail.mission.status] : ''}
            </p>
            {missionDetail && missionDetail?.mission.status !== 'ACCEPT' ? (
              <MenuComponent
                updateHandler={() => {
                  router.push(
                    `/manage/mission/update/${missionDetail?.schedule.scheduleId}`,
                  );
                }}
              ></MenuComponent>
            ) : null}
          </HStack>
          <Stack w="full">
            <p className={css({ textStyle: 'title3.bold' })}>
              {missionDetail?.mission?.title}
            </p>
            <HStack justify={'space-between'}>
              <HStack>
                <p className={css({ color: 'accent.lime' })}>
                  + {missionDetail?.mission.point.toLocaleString()}
                </p>
                <Image src="/coin.svg" alt="coin" width="30" height="30" />
              </HStack>
              {missionDetail && missionDetail.approval ? (
                <ApprovalProfile
                  src={missionDetail?.approval?.approver.image}
                  name={missionDetail?.approval?.approver.name}
                />
              ) : null}
            </HStack>
          </Stack>
        </Stack>
        {/* 인증 내용 */}
        <Stack
          justify="space-center"
          align="center"
          gap="1.5rem"
          flexGrow={1}
          w="full"
        >
          {missionDetail?.recognition ? (
            <>
              {missionDetail?.recognition?.image ? (
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
              ) : null}
              <p className={css({ textStyle: 'heading1.bold' })}>
                {missionDetail?.recognition?.content}
              </p>
            </>
          ) : (
            <Stack
              w="full"
              flexGrow={1}
              alignItems="center"
              justify={'center'}
              gap={'2rem'}
            >
              {missionDetail?.mission?.status !== 'ACCEPT' ? (
                <>
                  <Image
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Dotted%20Line%20Face.png"
                    alt="image"
                    width={150}
                    height={150}
                    style={{ alignSelf: 'center' }}
                  />
                  <p className={css({ textStyle: 'heading1.bold' })}>
                    아직 아이가 인증하지 않았어요...
                  </p>
                </>
              ) : (
                <>
                  <Image
                    src="/stamp.png"
                    alt="image"
                    width={300}
                    height={300}
                    style={{ alignSelf: 'center' }}
                  />
                  <p className={css({ textStyle: 'heading1.bold' })}>
                    인증 완료
                  </p>
                </>
              )}
            </Stack>
          )}
        </Stack>
        {/* 버튼 영역 */}
        <Stack w="full" gap="1.25rem">
          {missionDetail?.mission.status === 'EMPTY' ||
          missionDetail?.mission.status === 'PENDING' ? (
            <HStack w="full" justify="space-around" gap="1.125rem">
              <Button
                w="50%"
                h="3rem"
                rounded="0.875rem"
                bg="blue.500"
                textStyle="headline1.bold"
                onClick={() => postMissionApprove(params.id, 'ACCEPT')}
                disabled={isModalVisible}
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
                disabled={isModalVisible}
              >
                거절
              </Button>
            </HStack>
          ) : null}

          {missionDetail?.mission.status !== 'ACCEPT' ? (
            <div
              className={css({
                w: 'full',
                display: 'flex',
                justifyContent: 'flex-end',
              })}
            >
              <ApprovalProfile
                src={missionDetail?.mission.createdBy.image}
                name={missionDetail?.mission.createdBy.name}
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
      </Stack>
    </>
  );
};
export default ParentMissionDetail;
