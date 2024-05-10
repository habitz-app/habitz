import type { Meta, StoryObj } from '@storybook/react';
import PointCard from './PointCard';

export default {
  title: 'PointCard',
  component: PointCard,
  argTypes: {
    point: {
      type: 'number',
    },
  },
} as Meta;

type Story = StoryObj<typeof PointCard>;

export const Default: Story = {
  args: {
    point: 1000,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
