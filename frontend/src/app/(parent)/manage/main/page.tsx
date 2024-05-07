'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Circle, HStack } from 'styled-system/jsx';
import { circle, hstack, stack } from 'styled-system/patterns';
import { css } from 'styled-system/css';

const testCss = {
  bg: 'red.400',
  _hover: {
    bg: 'orange.400',
  },
};

type pointhistory = {
  pointHistoryId: number;
  content: string;
  changedDate: Date;
  amount: number;
  totalPoint: number;
  type: 'gain' | 'loss';
};

interface dummyChild {
  memberId: number;
  name: string;
  point: number;
  imageUrl: string;
  histories?: pointhistory[];
}

const dummyChildren: dummyChild[] = [
  {
    memberId: 1,
    name: '김싸피',
    point: 10450,
    imageUrl:
      'https://th.bing.com/th/id/OIG3.XjJC_rWVtDY_8a5.T.ux?w=1024&h=1024&rs=1&pid=ImgDetMain',
    histories: [
      {
        pointHistoryId: 1,
        content: '플라스틱 줍기',
        changedDate: new Date('2024-04-16T00:10:56'),
        amount: 100,
        type: 'gain',
        totalPoint: 10450,
      },
      {
        pointHistoryId: 2,
        content: '캔 줍기',
        changedDate: new Date('2024-04-16T00:12:56'),
        amount: 100,
        type: 'gain',
        totalPoint: 10450,
      },
    ],
  },
  {
    memberId: 2,
    name: '김첫째',
    point: 12250,
    imageUrl:
      'https://th.bing.com/th/id/OIG1.cyZykh.a17LIEHsNeBLo?w=1024&h=1024&rs=1&pid=ImgDetMain',
    histories: [
      {
        pointHistoryId: 1,
        content: '강아지 산책시키기',
        changedDate: new Date('2021-09-01'),
        amount: 200,
        type: 'gain',
        totalPoint: 10450,
      },
      {
        pointHistoryId: 2,
        content: '수학 숙제 5 페이지',
        changedDate: new Date('2021-08-01'),
        amount: 100,
        type: 'gain',
        totalPoint: 10450,
      },
      {
        pointHistoryId: 3,
        content: '닌텐도 스위치 구매',
        changedDate: new Date('2021-08-04'),
        amount: 330000,
        type: 'loss',
        totalPoint: 10450,
      },
    ],
  },
];

const Page: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<dummyChild>(
    dummyChildren[0],
  );
  return (
    <div>
      {/*'프로필 아이콘'*/}
      <HStack>
        {dummyChildren.map((child) => (
          <div
            key={child.memberId}
            className={circle({
              size: 50,
              overflow: 'hidden',
              position: 'relative',
            })}
            onClick={() => setSelectedChild(child)}
          >
            <Image src={child.imageUrl} alt={child.name} fill />
          </div>
        ))}
      </HStack>
      <div
        className={stack({
          width: 328,
          height: 150,
          bg: 'red.300',
          rounded: 20,
          justifyContent: 'space-between',
          p: 4,
        })}
      >
        <h1>{selectedChild.name} 어린이</h1>
        <div>
          보유 해빗
          <div>{selectedChild.point}</div>
        </div>
      </div>
      <div>
        <HStack justify="space-between">
          <span>활동 내역</span>
          <div>{'>'}</div>
        </HStack>
        <ul>
          {selectedChild.histories?.map((history) => {
            return (
              <li
                key={history.pointHistoryId}
                className={hstack({ justify: 'space-between' })}
              >
                <div>{history.content}</div>
                <div>{history.changedDate.toISOString().split('T', 1)}</div>
                <div>{history.amount}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
