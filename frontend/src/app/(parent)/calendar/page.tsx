'use client';
import Calendar from './calendar';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { hstack } from 'styled-system/patterns';

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const selectDateHandler = (date: string) => {
    setSelectedDate(date);
  };
  interface calendarChildInfo {
    month: string;
    childInfo: string[];
    days: {
      [key: string]: boolean[];
    };
  }

  interface dummyChildrenMission {
    childInfo: {
      memberUUID: string;
      color: string;
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

  interface dummyDateMission {
    [key: string]: dummyChildrenMission[];
  }

  let dummyCalendarData: calendarChildInfo = {
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

  let dummyChildrenMissionData: dummyDateMission = {
    '2024-05-01': [
      {
        childInfo: {
          memberUUID: 'adfkjds-dfsfsd',
          color: '#ff0000',
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
          color: '#ffd700',
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
          color: '#dda0dd',
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
          color: '#ff0000',
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
          color: '#ffd700',
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
          color: '#dda0dd',
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

  const ChildMissionBoard: React.FC<dummyChildrenMission> = ({
    childInfo,
    missions,
  }) => (
    <div className={css({ mb: '5px' })}>
      <div className={hstack({ justify: 'space-between' })}>
        <div className={hstack()}>
          <p>{childInfo.name}</p>{' '}
          <div
            className={css({
              bg: childInfo.color,
              // bg: '#ffd700',
              width: '24px',
              height: '24px',
              rounded: '9999px',
            })}
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
      {selectedDate && <div>{selectedDate}</div>}
      {/* <div className={css({ width: 'full', height: '500px' })}> */}
      <Calendar data={dummyCalendarData} selectDate={selectDateHandler} />
      {/* </div> */}
      {dummyChildrenMissionData[selectedDate] && (
        <div>
          {dummyChildrenMissionData[selectedDate].map((child, id) => (
            <ChildMissionBoard key={id} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Page;
