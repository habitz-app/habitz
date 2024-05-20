import type { Meta, StoryObj } from '@storybook/react';
import GoodsDetail from './GoodsDetail';

export default {
  title: 'GoodsDetail',
  component: GoodsDetail,
  argTypes: {
    name: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
} as Meta;

type Story = StoryObj<typeof GoodsDetail>;

export const Default: Story = {
  args: {
    name: '세븐일레븐 5000원 기프트카드',
    url: '/seven-eleven.jpg',
    price: 5000,
  },
};
