'use client';
import Calendar from './calendar';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';
import { colors } from './colors';

const Page = () => {
  // 선택한 날짜 관리하는 State
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const selectDateHandler = (date: string) => {
    setSelectedDate(date);
  };
  // 달력 조회 시 아이의 일정 조회 API Response
  interface calendarChildInfo {
    month: string;
    childInfo: string[];
    days: {
      [key: string]: boolean[];
    };
  }
  // 날짜 별 전체 아이에 대한 미션 목록 API Response
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
      staus: string;
      point: number;
      repeat: boolean;
      createdAt: string;
      createdBy: string;
    }[];
  }
  // Color 적용을 위한 id 추가
  interface childrenMission extends childMission {
    id: number;
  }
  // 날짜 별 아이에 대한 미션 목록 API Response 날짜 별 정리
  interface dateMission {
    [key: string]: childMission[];
  }

  let calendarData: calendarChildInfo = {
    month: '2024-05',
    childInfo: [
      'udkdd-adkjf-dfsfs',
      'dudfodis-dkfjsk-dkjfs',
      'dfjshkfk-dkjfksj-sjlfkdj',
    ],
    days: {
      '2024-05-01': [true, false, false],
      '2024-05-02': [true, true, true],
      '2024-05-03': [true, false, true],
      '2024-05-28': [true, true, true],
    },
  };

  let childMissionData: dateMission = {
    '2024-05-01': [
      {
        childInfo: {
          memberUUID: 'adfkjds-dfsfsd',
          name: '김첫째',
        },
        missions: [
          {
            missionId: 1,
            title: '더미 미션 1',
            content: '미션 상세',
            emoji: ':)',
            staus: 'PENDING',
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
            staus: 'ACCEPT',
            point: 500,
            repeat: true,
            createdAt: '2024-05-01 13:00:00',
            createdBy: '김싸피',
          },
        ],
      },
      {
        childInfo: {
          memberUUID: 'adfkjds-dfsfsd',
          name: '김둘째',
        },
        missions: [
          {
            missionId: 3,
            title: '진행 중 미션',
            content: '미션 상세',
            emoji: ':)',
            staus: 'EMPTY',
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
            staus: 'DECLINE',
            point: 500,
            repeat: true,
            createdAt: '2024-05-01 13:00:00',
            createdBy: '김싸피',
          },
        ],
      },
      {
        childInfo: {
          memberUUID: 'adfkjds-dfsfsd',
          name: '김셋째',
        },
        missions: [
          {
            missionId: 5,
            title: '진행 중 미션',
            content: '미션 상세',
            emoji: ':)',
            staus: 'EMPTY',
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
            staus: 'DECLINE',
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
            staus: 'DECLINE',
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
            staus: 'DECLINE',
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
          memberUUID: 'adfkjds-dfsfsd',
          name: '김첫째',
        },
        missions: [
          {
            missionId: 1,
            title: '더미 미션 2',
            content: '미션 상세',
            emoji: ':)',
            staus: 'PENDING',
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
            staus: 'ACCEPT',
            point: 500,
            repeat: true,
            createdAt: '2024-05-01 13:00:00',
            createdBy: '김싸피',
          },
        ],
      },
      {
        childInfo: {
          memberUUID: 'adfkjds-dfsfsd',
          name: '김둘째',
        },
        missions: [
          {
            missionId: 3,
            title: '진행 중 미션',
            content: '미션 상세',
            emoji: ':)',
            staus: 'EMPTY',
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
            staus: 'DECLINE',
            point: 500,
            repeat: true,
            createdAt: '2024-05-01 13:00:00',
            createdBy: '김싸피',
          },
        ],
      },
      {
        childInfo: {
          memberUUID: 'adfkjds-dfsfsd',
          name: '김셋째',
        },
        missions: [
          {
            missionId: 5,
            title: '진행 중 미션',
            content: '미션 상세',
            emoji: ':)',
            staus: 'EMPTY',
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
            staus: 'DECLINE',
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
            staus: 'DECLINE',
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
            staus: 'DECLINE',
            point: 500,
            repeat: true,
            createdAt: '2024-05-01 13:00:00',
            createdBy: '김싸피',
          },
        ],
      },
    ],
  };

  // 선택한 날짜에 해당하는 아이들의 미션 목록을 보여주는 컴포넌트
  const ChildMissionBoard: React.FC<childrenMission> = ({
    id,
    childInfo,
    missions,
  }) => (
    <div className={css({ mb: '5px' })}>
      <div className={hstack({ justify: 'space-between' })}>
        <div className={hstack()}>
          <p>{childInfo.name}</p>{' '}
          <div
            className={css({
              bg: colors[id],
              width: '20px',
              height: '20px',
              rounded: '9999px',
            })}
            style={{ background: colors[id] }}
          ></div>
        </div>
      </div>
      <ul>
        {missions.map((mission, id) => (
          <li key={id} className={hstack({ justify: 'space-between' })}>
            <p>{mission.title}</p>
            <p>{mission.staus}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <Calendar data={calendarData} selectDate={selectDateHandler} />
      {childMissionData[selectedDate] && (
        <div>
          {childMissionData[selectedDate].map((child, id) => (
            <ChildMissionBoard key={id} id={id} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Page;
