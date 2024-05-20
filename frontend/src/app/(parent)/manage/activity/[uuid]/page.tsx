'use client';
import axios from '@/apis/axios';
import {
  ChildRecentHistory,
  ChildRecentHistoryResponse,
} from '@/types/api/response';
import { IonIcon } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { chevronForwardOutline } from 'ionicons/icons';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import Image from 'next/image';
import { IconButton } from '@/components/ui/icon-button';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/common/Header';
const RecentHistory = ({ params }: { params: { uuid: string } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clickHandler = (history: ChildRecentHistory) => {
    if (history.status === 'MISSION') {
      router.push(`/manage/mission/detail/${history.historyInfo.missionId}`);
      // 아래 코드 status 확인 후 수정 필요
    } else if (history.status === 'Quiz') {
      router.push(`/manage/main`);
    } else if (history.status === 'Product') {
      router.push(`/manage/main`);
    }
  };
  const getChildRecentHistory = async (uuid: string) => {
    const res = await axios.get<ChildRecentHistoryResponse>(
      `point/recent/history/${uuid}`,
      {
        params: {
          limit: 50,
        },
      },
    );
    console.log('Get ChildRecentHistory Success! 😊');
    return res.data.data;
  };
  const { data: recentHistoryData, refetch: refetchRecentHistoryData } =
    useQuery<ChildRecentHistoryResponse>({
      queryKey: ['recentHistory', params.uuid],
      queryFn: () => getChildRecentHistory(params.uuid),
    });
  return (
    <>
      <Header isBack />
      <Stack px="1rem" py="1.25rem">
        <p className={css({ textStyle: 'title2.bold' })}>최근 활동</p>
        <p className={css({ textStyle: 'title3.bold' })}>
          {searchParams.get('name')}
        </p>
        <Stack gap="0.625rem" textStyle={'headline1.bold'}>
          {recentHistoryData?.map((history, id) => {
            return (
              <HStack
                key={id}
                shadow={'normal'}
                h={'6rem'}
                rounded={'20px'}
                px={'0.75rem'}
                py={'0.5rem'}
                gap="0.5rem"
              >
                <Stack
                  w="full"
                  // alignItems="center"
                  // alignContent={'center'}
                  // alignSelf={'center'}
                  py="0.75rem"
                >
                  <HStack maxH="2rem">
                    <p>{history.emoji}</p>
                    <p className={css({ lineClamp: 1 })}>
                      {history.historyInfo.content}
                    </p>
                  </HStack>
                  {/* 포인트 */}
                  <HStack ps="2.25rem" gap="0.25rem" flexShrink={1}>
                    <p
                      className={css({
                        textStyle: 'caption1.bold',
                        color: 'label.alternative',
                      })}
                    >
                      {history.historyInfo.point}
                    </p>
                    <Image src="/coin.svg" alt="coin" width={16} height={16} />
                  </HStack>
                </Stack>
                {history.status === 'MISSION' ? (
                  <HStack w="full" justify={'end'} flexShrink={2}>
                    <IconButton
                      variant={'ghost'}
                      onClick={() => {
                        clickHandler(history);
                      }}
                    >
                      <IonIcon icon={chevronForwardOutline}></IonIcon>
                    </IconButton>
                  </HStack>
                ) : null}
              </HStack>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};
export default RecentHistory;
