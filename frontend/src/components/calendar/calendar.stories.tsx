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
      calendar: [
        {
          child: {
            name: '용희원',
            memberUUID: 'Tgq0FM',
          },
          days: [
            '2024-05-02',
            '2024-05-07',
            '2024-05-08',
            '2024-05-09',
            '2024-05-10',
          ],
        },
        {
          child: {
            name: '정필모',
            memberUUID: 'zAsuGH',
          },
          days: ['2024-05-08'],
        },
      ],
    },
    selectedDate: '2024-05-08',
    selectDate: () => {},
    year: 2024,
    month: 5,
    setYear: () => {},
    setMonth: () => {},
  },
};
