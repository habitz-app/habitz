'use client';
import { useEffect, useState } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import ProfileCard from '@/components/common/ProfileCard';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import {
  ChildListResponse,
  ChildRecentHistoryResponse,
  Mission,
  HabitzHistoryResponse,
} from '@/types/api/response';
import ProfileIcon from '@/components/common/ProfileIcon';
import TodayMission from '@/components/main/TodayMission';
import RecentHistory from '@/components/main/RecentHistory';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import { getCurrentKSTDate } from '@/lib/date';

const ManageChildren = () => {
  const router = useRouter();
  const [selectedChild, setSelectedChild] = useState<ChildListResponse>({
    memberRole: 'CHILD',
    memberId: -1,
    name: '',
    profileImage: '',
    uuid: '',
    point: 0,
  });
  const date = new Date();
  const today = getCurrentKSTDate();

  const getChildList = async () => {
    const res = await axios.get<ChildListResponse[]>('/family/childList');
    console.log('Get ChildrenList Success! 😊');
    return res.data.data;
  };

  const getPointHistory = async (uuid: string) => {
    const res = await axios.get<HabitzHistoryResponse>('/point/history', {
      params: {
        start: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-01`,
        end: today,
      },
    });
    console.log('Get PointHistory Success! 😊');
    return res.data.data;
  };

  const getDateMissionData = async (date: string, uuid: string) => {
    const res = await axios.get<Mission[]>('/mission/children/list', {
      params: uuid ? { date: date, child: uuid } : { date: date },
    });
    console.log('Get Mission Success! 😊');
    return res.data.data;
  };

  const getChildRecentHistory = async (uuid: string) => {
    const res = await axios.get<ChildRecentHistoryResponse>(
      `point/recent/history/${uuid}`,
      { params: { limit: 5 } },
    );
    console.log('Get ChildRecentHistory Success! 😊');
    return res.data.data;
  };

  // useQuery
  const { data: childrenList, refetch: refetchChildrenList } = useQuery<
    ChildListResponse[]
  >({
    queryKey: ['Children'],
    queryFn: () => getChildList(),
    initialData: [],
  });

  const { data: pointHistory, refetch: refetchPointHistory } =
    useQuery<HabitzHistoryResponse>({
      queryKey: ['pointHistory', selectedChild.uuid],
      queryFn: () => getPointHistory(selectedChild.uuid),
      // initialData: [],
    });

  const { data: dateMissionData, refetch: refetchMissionData } = useQuery<
    Mission[]
  >({
    queryKey: ['dateMission', today, selectedChild.uuid],
    queryFn: () => getDateMissionData(today, selectedChild.uuid),
    initialData: [],
  });

  const { data: recentHistoryData, refetch: refetchRecentHistoryData } =
    useQuery<ChildRecentHistoryResponse>({
      queryKey: ['recentHistory', selectedChild.uuid],
      queryFn: () => getChildRecentHistory(selectedChild.uuid),
    });

  // useEffect
  useEffect(() => {
    console.log('😎 childrenList set');
    refetchChildrenList();
    console.log('childrenList:', childrenList);

    if (childrenList.length > 0) [setSelectedChild(childrenList[0])];
  }, [childrenList, refetchChildrenList]);

  useEffect(() => {
    console.log('😎 pointHistory set');
    refetchPointHistory();
    refetchMissionData();
  }, [childrenList, refetchPointHistory, selectedChild, refetchMissionData]);

  useEffect(() => {
    console.log('😎 selectedChild set');
    refetchMissionData();
  }, [selectedChild, refetchMissionData]);

  return (
    <>
      <Header />
      <Stack px="1rem" py="1.25rem" gap="0.625rem">
        {/*'프로필 아이콘'*/}
        <HStack>
          {childrenList.map((child, id) => (
            <button
              key={id}
              onClick={() => {
                setSelectedChild(child);
              }}
            >
              <ProfileIcon
                alt={'test'}
                imageUrl={
                  child.profileImage ||
                  'https://th.bing.com/th/id/OIG3.XjJC_rWVtDY_8a5.T.ux?w=1024&h=1024&rs=1&pid=ImgDetMain'
                }
              />
            </button>
          ))}
        </HStack>

        <ProfileCard name={selectedChild.name} point={selectedChild.point} />
        <TodayMission missions={dateMissionData} uuid={selectedChild.uuid} />
        {recentHistoryData && (
          <RecentHistory
            uuid={selectedChild.uuid}
            history={recentHistoryData}
            name={selectedChild.name}
          />
        )}
      </Stack>
    </>
  );
};

export default ManageChildren;
