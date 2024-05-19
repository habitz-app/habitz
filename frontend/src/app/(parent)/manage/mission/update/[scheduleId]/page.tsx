'use client';
import InputLabeled from '@/components/mission/InputLabeled';
import DatePicker from '@/components/mission/DatePicker';
import { useState, Dispatch, useEffect, useCallback } from 'react';
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
import { getCurrentKSTDate } from '@/lib/date';

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
    getCurrentKSTDate(),
    getCurrentKSTDate(),
  ]);
  const [weekDays, setWeekDays] = useState<boolean[]>(
    Array.from({ length: 7 }, (_, i) => i === (new Date().getDay() + 6) % 7),
  );
  const [dayFilter, setDayFilter] = useState<boolean[]>(
    Array.from({ length: 7 }, (_, i) => i === (new Date().getDay() + 6) % 7),
  );
  const [isFetched, setIsFetched] = useState<boolean>(false);

  // 선택 가능한 요일 필터링
  const filterDay = ([startDate, endDate]: string[]) => {
    const currentDate = new Date(startDate);
    const endDateDate = new Date(endDate);
    const dayFilter = [false, false, false, false, false, false, false];
    let count = 0;
    while (currentDate <= endDateDate && count < 7) {
      dayFilter[(currentDate.getDay() + 6) % 7] = true;
      currentDate.setDate(currentDate.getDate() + 1);
      count++;
    }
    console.log('test filter day', dayFilter);
    return dayFilter;
  };

  // 날짜 선택 시 요일 필터링
  const handleDate = (date: string[]) => {
    setDate(date);
    setDayFilter(filterDay(date));
    setWeekDays([...weekDays].map((day, index) => day && dayFilter[index]));
  };

  // 스케줄 데이터 불러오기
  const fetchScheduleData = useCallback((schedule: ScheduleResponse) => {
    setTitle(schedule.title);
    setEmoji(schedule.emoji);
    setContent(schedule.content);
    setPoint(schedule.point);
    setWeekDays(schedule.weekDays);
    setDayFilter(filterDay([schedule.startDate, schedule.endDate]));
    setDate([schedule.startDate, schedule.endDate]);
    setIsFetched(true);
  }, []);

  // get
  const getSchedule = async () => {
    const res = await axios.get<ScheduleResponse>(
      `/schedule/${params.scheduleId}`,
    );
    console.log('Get Schedule Success! 😊');
    return res.data.data;
  };

  // useQuery
  const {
    data: schedule,
    isLoading: isLoading,
    isSuccess: isSuccess,
  } = useQuery<ScheduleResponse>({
    queryKey: ['Schedule', params.scheduleId],
    queryFn: () => getSchedule(),
  });

  useEffect(() => {
    if (schedule) {
      fetchScheduleData(schedule);
    }
  }, [fetchScheduleData, schedule]);

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
        {isFetched ? (
          <>
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
            <DatePicker date={date} setDate={handleDate} />
            <DayPicker
              weekDays={weekDays}
              setWeekDays={setWeekDays}
              dayFilter={dayFilter}
            />
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
          </>
        ) : null}
      </div>
    </>
  );
};
export default Page;
