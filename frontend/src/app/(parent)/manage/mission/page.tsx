'use client';
import InputLabeled from '@/components/mission/inputLabeled';
import DatePicker from '@/components/mission/datePicker';
import { useState, Dispatch } from 'react';
import { stack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import DayPicker from '@/components/mission/dayPicker';
import axios from '@/apis/axios';
import { ScheduleResponse } from '@/types/api/response';
import { useRouter } from 'next/navigation';

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
  const handleCraeteSchedule = async () => {
    const requestBody: createSchedule = {
      title: title,
      content: content,
      emoji: emoji,
      // childUUID 는 로그인 기능 추가 후 수정해야 함
      childUUID: 'cijdfkjdk-dfjksjkd',
      startDate: date[0],
      endDate: date[1],
      weekDays: weekDays,
      point: point,
    };
    console.table(requestBody);
    const response = await axios.post<ScheduleResponse>(
      '/schedule',
      requestBody,
    );
    if (response?.status === 200) {
      console.log('success');
      router.push('/calendar');
    } else {
      console.log('fail');
      router.push('/calendar');
    }
  };
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
  return (
    <div
      className={stack({
        px: '16px',
        py: '20px',
        justify: 'between',
        align: 'center',
      })}
    >
      <h1 className={css({ width: 'full' })}>미션 생성</h1>
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
      <Button width="full" onClick={handleCraeteSchedule}>
        생성하기
      </Button>
      <div className={css({ h: '1000px' })}></div>
    </div>
  );
};
export default Page;
