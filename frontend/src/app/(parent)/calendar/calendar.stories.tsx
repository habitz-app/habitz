import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './calendar';

export default {
  title: 'Calendar',
  component: Calendar,
} as Meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    data: {
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
    },
    selectDate: (date: string) => {},
  },
};
