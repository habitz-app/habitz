'use client';
import React, { useState } from 'react';
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

type activity = {
  id: number;
  title: string;
  date: string;
  habitz: number;
};

interface dummyChild {
  id: number;
  name: string;
  habitz: number;
  imageUrl: string;
  activity: activity[];
}

const dummyChildren: dummyChild[] = [
  {
    id: 1,
    name: '김싸피',
    habitz: 10450,
    imageUrl:
      'https://th.bing.com/th/id/OIG3.XjJC_rWVtDY_8a5.T.ux?w=1024&h=1024&rs=1&pid=ImgDetMain',
    activity: [
      {
        id: 1,
        title: '플라스틱 줍기',
        date: '2021-09-01',
        habitz: 100,
      },
      {
        id: 2,
        title: '캔 줍기',
        date: '2021-09-01',
        habitz: 100,
      },
    ],
  },
  {
    id: 2,
    name: '김첫째',
    habitz: 12250,
    imageUrl:
      'https://th.bing.com/th/id/OIG1.cyZykh.a17LIEHsNeBLo?w=1024&h=1024&rs=1&pid=ImgDetMain',
    activity: [
      {
        id: 1,
        title: '강아지 산책시키기',
        date: '2021-09-01',
        habitz: 200,
      },
      {
        id: 2,
        title: '수학 숙제 5 페이지',
        date: '2021-08-01',
        habitz: 100,
      },
      {
        id: 3,
        title: '닌텐도 스위치 구매',
        date: '2021-08-04',
        habitz: -330000,
      },
    ],
  },
];

const Page: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<dummyChild>(
    dummyChildren[1],
  );
  return (
    <div>
      {/*'프로필 아이콘'*/}
      <HStack>
        {dummyChildren.map((child) => (
          <div
            key={child.id}
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
          <div>{selectedChild.habitz}</div>
        </div>
      </div>
      <div>
        <HStack justify="space-between">
          <span>활동 내역</span>
          <div>{'>'}</div>
        </HStack>
        <ul>
          {selectedChild.activity.map((activity) => {
            return (
              <li
                key={activity.id}
                className={hstack({ justify: 'space-between' })}
              >
                <div>{activity.title}</div>
                <div>{activity.habitz}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
