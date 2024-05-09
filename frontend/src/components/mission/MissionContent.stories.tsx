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
  },
} as Meta;

type Story = StoryObj<typeof MissionContent>;

export const Default: Story = {
  args: {
    title: '책상 정리하기',
    emoji: '🧹',
    point: 100,
    missionId: 1,
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
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
