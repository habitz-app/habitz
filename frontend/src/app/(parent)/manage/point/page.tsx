'use client';
import PointCard from '@/components/point/PointCard';
import PointHistory from '@/components/point/PointHistory';
import { use, useEffect, useState } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import axios from '@/apis/axios';
import { HabitzHistoryResponse } from '@/types/api/response';
import { useQuery } from '@tanstack/react-query';
const Page = () => {
  const [[startDate, endDate], setDate] = useState<string[]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .slice(0, 10),
    new Date().toISOString().slice(0, 10),
  ]);
  const getPointHistory = async ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => {
    const res = await axios.get<HabitzHistoryResponse>(`/point/history`, {
      params: { start: startDate, end: endDate },
    });
    return res.data.data;
  };
  const { data: history, refetch: refetchHistory } =
    useQuery<HabitzHistoryResponse>({
      queryKey: ['pointHistory', startDate, endDate],
      queryFn: () => getPointHistory({ startDate, endDate }),
      initialData: [],
    });

  useEffect(() => {
    refetchHistory();
  }, [refetchHistory, startDate, endDate]);
  return (
    <Stack
      w="full"
      justify={'space-between'}
      alignItems={'center'}
      px="1rem"
      pt="1.25rem"
      gap="2.5rem"
    >
      <PointCard point={10000000} />
      <PointHistory history={history} />
    </Stack>
  );
};
export default Page;
