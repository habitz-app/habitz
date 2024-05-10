import type { Meta, StoryObj } from '@storybook/react';
import GoodsInfo from './GoodsInfo';

export default {
  title: 'GoodsInfo',
  component: GoodsInfo,
  width: 300,
  argTypes: {
    url: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof GoodsInfo>;

export const Default: Story = {
  args: {
    url: '/seven-eleven.jpg',
  },
};
export const Wide: Story = {
  args: {
    url: '/convenience-store.jpg',
  },
};
export const Long: Story = {
  args: {
    url: '/height_long.jpeg',
  },
};
