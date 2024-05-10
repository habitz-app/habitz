import type { Meta, StoryObj } from '@storybook/react';
import MissionDetail from './MissionDetail';

export default {
  title: 'MissionDetail',
  component: MissionDetail,
  argTypes: {
    emoji: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    contents: {
      type: 'string',
    },
    status: {
      control: { type: 'radio' },
      options: ['ACCEPT', 'DECLINE', 'EMPTY', 'PENDING'],
    },
    point: {
      type: 'number',
    },
  },
} as Meta;

type Story = StoryObj<typeof MissionDetail>;

export const EMPTY: Story = {
  args: {
    emoji: '😊',
    title: '아침 인사 하기',
    date: '2024-04-23',
    contents:
      '우리 첫째가 아침에 일어나서 빼먹지 않고 엄마 아빠한테 아침 인사를 해 준다면 미션 성공이란다 ^^',
    status: 'EMPTY',
    point: 100,
  },
};

export const ACCEPT: Story = {
  args: {
    emoji: '😊',
    title: '아침 인사 하기',
    date: '2024-04-23',
    contents:
      '우리 첫째가 아침에 일어나서 빼먹지 않고 엄마 아빠한테 아침 인사를 해 준다면 미션 성공이란다 ^^',
    status: 'ACCEPT',
    point: 100,
  },
};
