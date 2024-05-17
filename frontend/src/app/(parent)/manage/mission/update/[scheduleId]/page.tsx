'use client';
import InputLabeled from '@/components/mission/InputLabeled';
import DatePicker from '@/components/mission/DatePicker';
import { useState, Dispatch, useEffect, Suspense } from 'react';
import { stack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import DayPicker from '@/components/mission/DayPicker';
import axios from '@/apis/axios';
import { ChildListResponse, ScheduleResponse } from '@/types/api/response';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '@/components/common/Header';

interface createSchedule {
  title: string;
  content: string;
  emoji: string;
  childUUID: string;
  startDate: string;
  endDate: string;
  weekDays: boolean[];
  point: number;
}

const Page = () => {
  const router = useRouter();
  const params = useParams<{ scheduleId: string }>();
  const [title, setTitle] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('😀');
  const [content, setContent] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const [date, setDate] = useState<string[]>([
    new Date().toISOString().slice(0, 10),
    new Date().toISOString().slice(0, 10),
  ]);
  const [weekDays, setWeekDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const getScheduleData = async (id: string) => {
    const res = await axios.get<ScheduleResponse>(`/schedule/${id}`);
    console.log('Get ScheduleData Success! 😊');
    return res.data.data;
  };

  const putSchedule = async () => {
    const res = await axios.put<ScheduleResponse>(
      `/schedule/${Number(params.scheduleId)}`,
      {
        title: title,
        content: content,
        emoji: emoji,
        startDate: date[0],
        endDate: date[1],
        weekDays: weekDays,
        point: point,
      },
    );
    return res.data.data;
  };

  const { mutate } = useMutation<ScheduleResponse>({
    mutationFn: putSchedule,
    onSuccess: () => {
      router.push('/manage/mission');
    },
    onError: (error) => {
      console.log('Put Schedule Fail! 😢');
      console.log(error);
    },
  });

  const { data: scheduleData, refetch: refetchScheduleData } =
    useQuery<ScheduleResponse>({
      queryKey: ['schedule', params.scheduleId],
      queryFn: () => getScheduleData(params.scheduleId),
    });

  useEffect(() => {
    if (scheduleData) {
      setTitle(scheduleData.title);
      setEmoji(scheduleData.emoji);
      setContent(scheduleData.content);
      setPoint(scheduleData.point);
      setDate([scheduleData.startDate, scheduleData.endDate]);
      setWeekDays(scheduleData.weekDays);
    }
  }, [scheduleData]);

  return (
    <>
      <Header isBack />
      <div
        className={stack({
          px: '16px',
          py: '20px',
          justify: 'between',
          align: 'center',
        })}
      >
        <h1 className={css({ width: 'full', textStyle: 'title2.bold' })}>
          미션 수정
        </h1>
        <InputLabeled
          id="미션"
          label="미션"
          placeholder="미션을 입력하세요"
          inputValue={title}
          setInputValue={
            setTitle as Dispatch<React.SetStateAction<string | number>>
          }
          emoji={emoji}
          setEmoji={setEmoji}
        ></InputLabeled>
        <InputLabeled
          id="내용"
          label="내용"
          placeholder="내용을 입력하세요"
          inputValue={content}
          setInputValue={
            setContent as Dispatch<React.SetStateAction<string | number>>
          }
        ></InputLabeled>
        <InputLabeled
          id="포인트"
          label="포인트"
          placeholder="포인트를 입력하세요"
          type="number"
          inputValue={point}
          setInputValue={
            setPoint as Dispatch<React.SetStateAction<string | number>>
          }
        ></InputLabeled>
        <DatePicker date={date} setDate={setDate} />
        <Suspense>
          <DayPicker
            weekDays={
              scheduleData
                ? scheduleData.weekDays
                : [false, false, false, false, false, false, false]
            }
            //   setWeekDays={setWeekDays}
            setWeekDays={() => {}}
          />
        </Suspense>
        <Button
          width="full"
          h="3.75rem"
          rounded={'0.875rem'}
          bg="primary.normal"
          color="static.black"
          textStyle={'headline1.bold'}
          onClick={() => {
            mutate();
          }}
        >
          수정하기
        </Button>
        {/* {targetChild.uuid}
      <hr />
      {params.uuid} */}
      </div>
    </>
  );
};
export default Page;
