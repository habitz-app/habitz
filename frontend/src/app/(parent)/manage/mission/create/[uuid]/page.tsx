'use client';
import InputLabeled from '@/components/mission/InputLabeled';
import DatePicker from '@/components/mission/DatePicker';
import { useState, Dispatch, useEffect } from 'react';
import { stack } from 'styled-system/patterns';
import { css } from 'styled-system/css';
import { Button } from '@/components/ui/button';
import DayPicker from '@/components/mission/DayPicker';
import axios from '@/apis/axios';
import { ChildListResponse, SchedulePostResponse } from '@/types/api/response';
import { useRouter, useParams } from 'next/navigation';
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
  const searchChild = ({
    uuid,
    data,
  }: {
    uuid: string;
    data: ChildListResponse[];
  }) => {
    let foundChild: ChildListResponse | null = null;
    data.forEach((child) => {
      if (child.uuid === uuid) {
        foundChild = child;
        return;
      }
    });
    if (foundChild) {
      setTargetChild(foundChild);
    } else {
      // console.log('잘못된 접근입니다.', uuid, data);
      alert('잘못된 접근입니다.');
      router.back();
    }
  };
  const router = useRouter();
  const params = useParams<{ uuid: string }>();
  const handleCreateSchedule = async () => {
    if (!title || point <= 0) {
      alert('필수 입력값을 입력해주세요.');
      return;
    }
    const requestBody: createSchedule = {
      title: title,
      content: content,
      emoji: emoji,
      childUUID: targetChild ? targetChild.uuid : '',
      startDate: date[0],
      endDate: date[1],
      weekDays: weekDays,
      point: point,
    };
    console.table(requestBody);
    const response = await axios.post<SchedulePostResponse>(
      '/schedule',
      requestBody,
    );
    if (response?.status === 200) {
      console.log('success');
      router.push('/manage/mission');
    } else {
      console.log('fail');
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
  const [weekDays, setWeekDays] = useState<boolean[]>(
    Array.from({ length: 7 }, (_, i) => i === (new Date().getDay() + 6) % 7),
  );
  const [targetChild, setTargetChild] = useState<ChildListResponse>({
    memberId: -1,
    memberRole: 'CHILD',
    name: '',
    profileImage: '',
    uuid: '',
    point: 0,
  });

  useEffect(() => {
    axios.get<ChildListResponse[]>('/family/childList').then((response) => {
      console.log('Request Success (ChildList):', response.data.data);
      // 자식이 맞는지 확인
      searchChild({ uuid: params.uuid, data: response.data.data });
    });
  }, []);
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
          미션 생성
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
          onClick={handleCreateSchedule}
        >
          생성하기
        </Button>
        {/* {targetChild.uuid}
      <hr />
      {params.uuid} */}
      </div>
    </>
  );
};
export default Page;
