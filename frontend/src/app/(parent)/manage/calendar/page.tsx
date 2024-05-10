'use client';
import Calendar from '@/components/calendar/calendar';
import { useCallback, useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';
import { colors } from './colors';
import { CalendarResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import { calendar } from 'ionicons/icons';

// 날짜 별 전체 아이에 대한 미션 목록 인터페이스
interface childMission {
  childInfo: {
    memberUUID: string;
    name: string;
  };
  missions: {
    missionId: number;
    title: string;
    content: string;
    emoji: string;
    status: string;
    point: number;
    repeat: boolean;
    createdAt: string;
    createdBy: string;
  }[];
}

// 날짜 별 아이에 대한 미션 목록 API Response 날짜 별 정리
interface dateMission {
  [key: string]: childMission[];
}

// Dummy Data (API 연결 후 대체)
const dummyCalendarResonseData: CalendarResponse = {
  month: '2024-05',
  calendar: [
    {
      child: {
        name: '용희원',
        memberUUID: 'Tgq0FM',
      },
      days: [
        '2024-05-02',
        '2024-05-07',
        '2024-05-08',
        '2024-05-09',
        '2024-05-10',
      ],
    },
    {
      child: {
        name: '정필모',
        memberUUID: 'zAsuGH',
      },
      days: ['2024-05-08'],
    },
  ],
};
const dummyChildMissionData: dateMission = {
  '2024-05-01': [
    {
      childInfo: {
        memberUUID: 'Tgq0FM',
        name: '김첫째',
      },
      missions: [
        {
          missionId: 1,
          title: '더미 미션 1',
          content: '미션 상세',
          emoji: ':)',
          status: 'PENDING',
          point: 100,
          repeat: false,
          createdAt: '2024-05-01 12:00:00',
          createdBy: '김싸피',
        },
        {
          missionId: 2,
          title: '성공 미션 (정기)',
          content: '미션 성공',
          emoji: ':)',
          status: 'ACCEPT',
          point: 500,
          repeat: true,
          createdAt: '2024-05-01 13:00:00',
          createdBy: '김싸피',
        },
      ],
    },
    {
      childInfo: {
        memberUUID: 'zAsuGH',
        name: '김둘째',
      },
      missions: [
        {
          missionId: 3,
          title: '진행 중 미션',
          content: '미션 상세',
          emoji: ':)',
          status: 'EMPTY',
          point: 700,
          repeat: true,
          createdAt: '2024-05-01 12:00:00',
          createdBy: '김싸피',
        },
        {
          missionId: 4,
          title: '거절 미션',
          content: '미션 실패',
          emoji: ':(',
          status: 'DECLINE',
          point: 500,
          repeat: true,
          createdAt: '2024-05-01 13:00:00',
          createdBy: '김싸피',
        },
      ],
    },
    {
      childInfo: {
        memberUUID: 'zAsuGH',
        name: '김셋째',
      },
      missions: [
        {
          missionId: 5,
          title: '진행 중 미션',
          content: '미션 상세',
          emoji: ':)',
          status: 'EMPTY',
          point: 700,
          repeat: true,
          createdAt: '2024-05-01 12:00:00',
          createdBy: '김싸피',
        },
        {
          missionId: 6,
          title: '거절 미션',
          content: '미션 실패',
          emoji: ':(',
          status: 'DECLINE',
          point: 500,
          repeat: true,
          createdAt: '2024-05-01 13:00:00',
          createdBy: '김싸피',
        },
        {
          missionId: 7,
          title: '거절 미션',
          content: '미션 실패',
          emoji: ':(',
          status: 'DECLINE',
          point: 500,
          repeat: true,
          createdAt: '2024-05-01 13:00:00',
          createdBy: '김싸피',
        },
        {
          missionId: 8,
          title: '거절 미션',
          content: '미션 실패',
          emoji: ':(',
          status: 'DECLINE',
          point: 500,
          repeat: true,
          createdAt: '2024-05-01 13:00:00',
          createdBy: '김싸피',
        },
      ],
    },
  ],
  '2024-05-02': [
    {
      childInfo: {
        memberUUID: 'zAsuGH',
        name: '김첫째',
      },
      missions: [
        {
          missionId: 1,
          title: '더미 미션 2',
          content: '미션 상세',
          emoji: ':)',
          status: 'PENDING',
          point: 100,
          repeat: false,
          createdAt: '2024-05-01 12:00:00',
          createdBy: '김싸피',
        },
        {
          missionId: 2,
          title: '성공 미션 (정기)',
          content: '미션 성공',
          emoji: ':)',
          status: 'ACCEPT',
          point: 500,
          repeat: true,
          createdAt: '2024-05-01 13:00:00',
          createdBy: '김싸피',
        },
      ],
    },
  ],
};

const Page = () => {
  // 선택한 날짜 관리하는 State
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // 선택한 날짜 변경 핸들러
  const selectDateHandler = (date: string) => {
    setSelectedDate(date);
  };

  // 달력 조회 시 아이의 일정 조회 API Response State
  const [calendarResponseData, setCalendarResponseData] =
    useState<CalendarResponse>({
      month: `${year}-${month < 10 ? `0${month}` : month}`,
      calendar: [],
    });

  const getCalendarData = async (year: number, month: number) => {
    const res = await axios.get<CalendarResponse>('/calendar', {
      params: { year: year, month: month },
    });
    console.log('Query Success! 😊');
    return res.data.data;
  };

  const { data: calendarData } = useQuery<CalendarResponse>({
    queryKey: ['calendar', year, month],
    queryFn: () => getCalendarData(year, month),
    initialData: {
      month: `${year}-${month < 10 ? `0${month}` : month}`,
      calendar: [],
    },
  });

  // 아이 별 색상 지정 핸들러
  const personalColorHandler = (calendarResponseData: CalendarResponse) => {
    const personalColors: { [key: string]: string } = {};
    calendarResponseData.calendar.map((child, id) => {
      personalColors[child.child.memberUUID] = colors[id];
    });
    return personalColors;
  };
  // 아이 별 색상 지정 State
  const [personalColors, setPersonalColors] = useState(
    personalColorHandler(calendarResponseData),
  );

  // 선택한 날짜에 해당하는 아이들의 미션 목록 State
  const [childMissionData, setChildMissionData] = useState(
    // API 연결 후 더미 데이터 대체
    dummyChildMissionData,
  );

  // 선택한 날짜에 해당하는 아이들의 미션 목록을 보여주는 컴포넌트
  const ChildMissionBoard = ({ childInfo, missions }: childMission) => (
    <div className={css({ mb: '5px' })}>
      <div className={hstack({ justify: 'space-between' })}>
        <div className={hstack()}>
          <p>{childInfo.name}</p>{' '}
          <div
            className={css({
              bg: personalColors[childInfo.memberUUID],
              width: '20px',
              height: '20px',
              rounded: '9999px',
            })}
            style={{ background: personalColors[childInfo.memberUUID] }}
          ></div>
        </div>
      </div>
      <ul>
        {missions.map((mission, id) => (
          <li key={id} className={hstack({ justify: 'space-between' })}>
            <p>{mission.title}</p>
            <p>{mission.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const requestCalendar = useCallback(async () => {
    try {
      console.log('requestCalendar');
      const response = await axios.get<CalendarResponse>('/calendar', {
        params: { year: year, month: month },
      });
      // const response = await axios.get<any>('family/memberList');
      console.log('Calendar Request Success:');
      console.table(response.data.data.calendar);
      // setCalendarResponseData(response.data.data);
    } catch (error) {
      console.log('error occured');
      console.error(error);
    }
  }, [month, year]);

  // 마운트 시, 월 변경 시 달력 조회 API 호출
  useEffect(() => {
    requestCalendar(); // Call the requestCalendar function here
  }, [month, requestCalendar]);

  // 아이 별 색상 지정 Effect
  useEffect(() => {
    setPersonalColors(personalColorHandler(calendarResponseData));
  }, [calendarResponseData]);

  useEffect(() => {
    console.log(1);
  }, [calendarData]);
  return (
    <div>
      <Calendar
        data={calendarResponseData}
        selectDate={selectDateHandler}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
      {childMissionData[selectedDate] && (
        <div>
          {childMissionData[selectedDate].map((child, id) => (
            <ChildMissionBoard key={id} {...child} />
          ))}
        </div>
      )}
      {selectedDate}
      {year}
      {month}
      <hr />
      {calendarData.calendar[0]?.child.memberUUID}
    </div>
  );
};
export default Page;
