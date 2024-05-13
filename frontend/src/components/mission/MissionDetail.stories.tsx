import type { Meta, StoryObj } from '@storybook/react';
import MissionDetail from './MissionDetail';
import { MissionDetailResponse } from '@/types/api/response';

export default {
  title: 'MissionDetail',
  component: MissionDetail,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

type Story = StoryObj<typeof MissionDetail>;

const mission: MissionDetailResponse = {
  schedule: {
    scheduleId: 1,
  },
  mission: {
    emoji: '😊',
    title: '아침 인사 하기',
    content:
      '우리 첫째가 아침에 일어나서 빼먹지 않고 엄마 아빠한테 아침 인사를 해 준다면 미션 성공이란다 ^^',
    status: 'EMPTY',
    point: 100,
    missionId: 1,
    repeat: false,
    createdAt: '2024-05-13',
    createdBy: '2024-05-13',
  },
  recognition: {
    image: 'https://via.placeholder.com/150',
    content: '',
    updatedAt: '',
  },
  approval: {
    name: '',
    comment: '',
  },
};

export const EMPTY: Story = {
  args: {
    mission: mission,
  },
};

export const PENDING: Story = {
  args: {
    mission: {
      ...mission,
      mission: {
        ...mission.mission,
        status: 'PENDING',
      },
      recognition: {
        image: 'https://via.placeholder.com/250',
        content: '인사 했어요!',
        updatedAt: '2024-05-13',
      },
    },
  },
};

export const ACCEPT: Story = {
  args: {
    mission: {
      ...mission,
      mission: {
        ...mission.mission,
        status: 'ACCEPT',
      },
      recognition: {
        image: 'https://via.placeholder.com/250',
        content: '인사 했어요!',
        updatedAt: '2024-05-13',
      },
      approval: {
        name: '정필모',
        comment: '',
      },
    },
  },
};

export const DECLINE: Story = {
  args: {
    mission: {
      ...mission,
      mission: {
        ...mission.mission,
        status: 'DECLINE',
      },
      recognition: {
        image: 'https://via.placeholder.com/250',
        content: '인사 했어요!',
        updatedAt: '2024-05-13',
      },
      approval: {
        name: '정필모',
        comment: '엄마한테만 했어요.',
      },
    },
  },
};
