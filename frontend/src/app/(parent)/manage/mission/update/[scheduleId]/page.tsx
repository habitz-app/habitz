'use client';
import InputLabeled from '@/components/mission/InputLabeled';
import DatePicker from '@/components/mission/DatePicker';
import { useState, Dispatch, useEffect } from 'react';
import { stack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import DayPicker from '@/components/mission/DayPicker';
import axios from '@/apis/axios';
import {
  ChildListResponse,
  SchedulePostResponse,
  SchedulePutResponse,
  ScheduleResponse,
} from '@/types/api/response';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'styled-system/jsx';
import ChildProfileBox from '@/components/mission/ChildProfileBox';

interface UpdateScheduleRequest {
  title: string;
  content: string;
  emoji: string;
  startDate: string;
  endDate: string;
  weekDays: boolean[];
  point: number;
}

const Page = ({ params }: { params: { scheduleId: number } }) => {
  const router = useRouter();

  // put 요청
  const handleUpdateSchedule = async () => {
    if (!title || point < 0) {
      alert('필수 입력값을 입력해주세요.');
      return;
    }

    const requestBody: UpdateScheduleRequest = {
      title: title,
      content: content,
      emoji: emoji,
      startDate: date[0],
      endDate: date[1],
      weekDays: weekDays,
      point: point,
    };
    console.table(requestBody);
    const response = await axios.put<SchedulePutResponse>(
      `/schedule/${params.scheduleId}`,
      requestBody,
    );
    if (response?.status === 200) {
      console.log('Update Success! 😊');
      router.push('/manage/mission');
    } else {
      console.log('fail');
    }
  };

  // State
  const [title, setTitle] = useState<string>('');
  const [emoji, setEmoji] = useState<string>('😀');
  const [content, setContent] = useState<string>('');
  const [point, setPoint] = useState<number>(0);
  const [date, setDate] = useState<string[]>([
    new Date().toISOString().slice(0, 10),
    new Date().toISOString().slice(0, 10),
  ]);
  const [weekDays, setWeekDays] = useState<boolean[]>(
    Array.from({ length: 7 }, (_, i) => i === (new Date().getDay() + 6) % 7),
  );

  const fetchScheduleData = (schedule: ScheduleResponse) => {
    setTitle(schedule.title);
    setEmoji(schedule.emoji);
    setContent(schedule.content);
    setPoint(schedule.point);
    setDate([schedule.startDate, schedule.endDate]);
    setWeekDays(schedule.weekDays);
  };

  // get

  const getSchedule = async () => {
    const res = await axios.get<ScheduleResponse>(
      `/schedule/${params.scheduleId}`,
    );
    console.log('Get Schedule Success! 😊');
    return res.data.data;
  };

  // useQuery
  const { data: schedule, refetch: refetchSchedule } =
    useQuery<ScheduleResponse>({
      queryKey: ['Schedule', params.scheduleId],
      queryFn: () => getSchedule(),
    });

  useEffect(() => {
    if (schedule) {
      fetchScheduleData(schedule);
    }
  }, [schedule]);
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
        <DayPicker weekDays={weekDays} setWeekDays={setWeekDays} />
        <Button
          width="full"
          h="3.75rem"
          rounded={'0.875rem'}
          bg="primary.normal"
          color="static.black"
          textStyle={'headline1.bold'}
          onClick={handleUpdateSchedule}
        >
          수정하기
        </Button>
      </div>
    </>
  );
};
export default Page;
