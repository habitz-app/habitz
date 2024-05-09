import type { Meta, StoryObj } from '@storybook/react';
import MissionContent from './MissionContent';

export default {
  title: 'MissionContent',
  component: MissionContent,
  argTypes: {
    title: {
      type: 'string',
    },
    emoji: {
      type: 'string',
    },
    point: {
      type: 'number',
    },
    missionId: {
      type: 'number',
    },
    status: {
      control: { type: 'radio' },
      options: ['ACCEPT', 'DECLINE', 'EMPTY', 'PENDING'],
    },
  },
} as Meta;

type Story = StoryObj<typeof MissionContent>;

export const EMPTY: Story = {
  args: {
    title: '책상 정리하기',
    emoji: '🧹',
    point: 100,
    missionId: 1,
    status: 'EMPTY',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Diarys: Story = {
  args: {
    title: '일기 쓰기',
    emoji: '📒',
    point: 80,
    missionId: 2,
    status: 'EMPTY',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const ACCEPT: Story = {
  args: {
    title: '일어나서 이불 개기',
    emoji: '⏰',
    point: 200,
    missionId: 3,
    status: 'ACCEPT',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
