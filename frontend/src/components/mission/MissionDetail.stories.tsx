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
    image: {
      type: 'string',
    },
    recognitionContent: {
      type: 'string',
    },
    approvalName: {
      type: 'string',
    },
    approvalComment: {
      type: 'string',
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
    image: 'https://via.placeholder.com/250',
  },
};

export const PENDING: Story = {
  args: {
    emoji: '😊',
    title: '아침 인사 하기',
    date: '2024-04-23',
    contents:
      '우리 첫째가 아침에 일어나서 빼먹지 않고 엄마 아빠한테 아침 인사를 해 준다면 미션 성공이란다 ^^',
    status: 'PENDING',
    point: 100,
    image: 'https://via.placeholder.com/250',
    recognitionContent: '인사완료!',
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
    image: 'https://via.placeholder.com/250',
    recognitionContent: '인사완료!',
    approvalName: '정필모',
  },
};

export const DECLINE: Story = {
  args: {
    emoji: '😊',
    title: '아침 인사 하기',
    date: '2024-04-23',
    contents:
      '우리 첫째가 아침에 일어나서 빼먹지 않고 엄마 아빠한테 아침 인사를 해 준다면 미션 성공이란다 ^^',
    status: 'DECLINE',
    point: 100,
    image: 'https://via.placeholder.com/250',
    recognitionContent: '인사완료!',
    approvalName: '정필모',
    approvalComment: '엄마한테만 인사했어요.',
  },
};
