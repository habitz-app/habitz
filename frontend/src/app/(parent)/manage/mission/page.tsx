'use client';
import Calendar from '@/components/calendar/calendar';
import { useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';
import { colors } from './colors';
import { CalendarResponse } from '@/types/api/response';
import axios from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import { HStack, Stack } from 'styled-system/jsx';
import { token, Token } from 'styled-system/tokens';
import Header from '@/components/common/Header';
import { IconButton } from '@/components/ui/icon-button';
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useRouter } from 'next/navigation';
// 날짜 별 전체 아이에 대한 미션 목록 인터페이스
interface childMission {
  childInfo: {
    memberUUID: string;
    name: string;
  };
  missions?: {
    missionId: number;
    title: string;
    content: string;
    emoji: string;
    status: 'EMPTY' | 'ACCEPT' | 'DECLINE' | 'PENDING';
    point: number;
    repeat: boolean;
    createdAt: string;
    createdBy: string;
  }[];
  schedules?: {
    scheduleId: number;
    title: string;
    content: string;
    emoji: string;
    point: number;
    repeat: boolean;
    createdAt: string;
    createdBy: string;
  }[];
}

const Page = () => {
  const router = useRouter();
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

  const getCalendarData = async (year: number, month: number) => {
    const res = await axios.get<CalendarResponse>('/calendar', {
      params: { year: year, month: month },
    });
    console.log('Get calendar Success! 😊');
    return res.data.data;
  };

  const { data: calendarData, refetch: refetchCalendarData } =
    useQuery<CalendarResponse>({
      queryKey: ['calendar', year, month],
      queryFn: () => getCalendarData(year, month),
      initialData: {
        month: `${year}-${month < 10 ? `0${month}` : month}`,
        calendar: [],
      },
    });
  const getDateMissionData = async (date: string) => {
    const givenDate = new Date(date);
    const currentDate = new Date();
    if (givenDate > currentDate) {
      const res = await axios.get<childMission[]>('/schedule/children/list', {
        params: { date: date },
      });
      console.log('Get Schedule Success! 😊');
      return res.data.data;
    } else {
      const res = await axios.get<childMission[]>('/mission/children/list', {
        params: { date: date },
      });
      console.log('Get Mission Success! 😊');
      return res.data.data;
    }
  };
  const { data: dateMissionData, refetch: refetchMissionData } = useQuery<
    childMission[]
  >({
    queryKey: ['dateMission', selectedDate],
    queryFn: () => getDateMissionData(selectedDate),
    initialData: [],
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
    personalColorHandler(calendarData),
  );

  // 선택한 날짜에 해당하는 아이들의 미션 목록을 보여주는 컴포넌트
  const ChildMissionBoard = ({
    childInfo,
    missions,
    schedules,
  }: childMission) => {
    // 미션 상태에 따른 색상 지정
    const statusMap: {
      [key: string]: {
        value: string;
        color: Token;
      };
    } = {
      PENDING: { value: '검사중', color: 'colors.status.cautionary' },
      ACCEPT: { value: '완료', color: 'colors.status.positive' },
      DECLINE: { value: '실패', color: 'colors.status.negative' },
      EMPTY: { value: '미완료', color: 'colors.label.alternative' },
    };

    return (
      <div className={css({ mb: '2rem' })}>
        <div className={hstack({ justify: 'space-between', mb: '0.75rem' })}>
          {/* 자녀 이름과 색상 */}
          <div className={hstack({ minW: '6rem', justify: 'space-between' })}>
            <p className={css({ textStyle: 'title3.bold' })}>
              {childInfo.name}
            </p>
            <div
              className={css({
                bg: personalColors[childInfo.memberUUID],
                width: '1rem',
                height: '1rem',
                rounded: '9999px',
              })}
              style={{ background: personalColors[childInfo.memberUUID] }}
            ></div>
          </div>
        </div>
        {/* 미션 목록 */}
        <ul>
          {missions &&
            missions.map((mission, id) => (
              <li
                key={id}
                className={hstack({
                  justify: 'space-between',
                  mb: '0.5rem',
                  cursor: 'pointer',
                  textStyle: 'headline1.medium',
                })}
                onClick={() => {
                  router.push(`mission/detail/${mission.missionId}`);
                }}
              >
                <HStack w="full" flexGrow={2} flexShrink={1}>
                  <p className={css({ lineClamp: 1 })}>
                    {mission.emoji} {mission.title}
                  </p>
                </HStack>
                <HStack w="1/2" justify={'end'} flexGrow={1} flexShrink={1}>
                  <p
                    className={css({
                      color: statusMap[mission.status].color,
                    })}
                    style={{
                      color: token.var(statusMap[mission.status].color),
                    }}
                  >
                    {statusMap[mission.status].value}
                  </p>
                </HStack>
              </li>
            ))}
          {schedules &&
            schedules.map((schedule, id) => (
              <li
                key={id}
                className={hstack({
                  justify: 'space-between',
                  mb: '0.5rem',
                  cursor: 'pointer',
                  textStyle: 'headline1.medium',
                })}
                onClick={() => {
                  router.push(`mission/update/${schedule.scheduleId}`);
                }}
              >
                <div>
                  <span>
                    {schedule.emoji} {schedule.title}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  // 마운트 시, 월 변경 시 달력 조회 API 호출
  useEffect(() => {
    console.log('📅 Calendar Data Refetch');
    async function fetchData() {
      await refetchCalendarData();
      setPersonalColors(personalColorHandler(calendarData));
    }
    fetchData();
  }, [month, year, refetchCalendarData, calendarData]);

  useEffect(() => {
    console.log('💻 Mission Data Refetch');
    const givenDate = new Date(selectedDate);
    const currentDate = new Date();
    // console.log('is future?', `${givenDate > currentDate}`);
    refetchMissionData();
  }, [selectedDate, refetchMissionData]);

  return (
    <div>
      <Header isMission={true} />
      <Calendar
        data={calendarData}
        selectedDate={selectedDate}
        selectDate={selectDateHandler}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
      />
      <Stack px="1rem">
        {dateMissionData && (
          <div>
            {dateMissionData.map((child, id) => (
              <ChildMissionBoard key={id} {...child} />
            ))}
          </div>
        )}
      </Stack>
    </div>
  );
};
export default Page;
