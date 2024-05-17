import type { Meta, StoryObj } from '@storybook/react';
import MissionPreview from './MissionPreview';

export default {
  title: 'MissionPreview',
  component: MissionPreview,
  argTypes: {
    missionId: {
      type: 'number',
    },
    title: {
      type: 'string',
    },
    status: {
      control: { type: 'radio' },
      options: ['ACCEPT', 'DECLINE', 'EMPTY', 'PENDING'],
    },
    isParent: {
      type: 'boolean',
    },
    emoji: {
      type: 'string',
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta;

type Story = StoryObj<typeof MissionPreview>;

export const EMPTY: Story = {
  args: {
    missionId: 1,
    title: '일어나서 이불 개기',
    status: 'EMPTY',
    emoji: '🛌',
  },
};

export const ACCEPT: Story = {
  args: {
    missionId: 2,
    title: '일어나서 이불 개기',
    status: 'ACCEPT',
    emoji: '🛌',
  },
};

export const DECLINE: Story = {
  args: {
    missionId: 3,
    title: '일어나서 이불 개기',
    status: 'DECLINE',
    emoji: '🛌',
  },
};

export const PENDING: Story = {
  args: {
    missionId: 4,
    title: '일어나서 이불 개기',
    status: 'PENDING',
    emoji: '🛌',
  },
};
