import type { Meta, StoryObj } from '@storybook/react';
import GoodsCard from './GoodsCard';

export default {
  title: 'GoodsCard',
  component: GoodsCard,
  argTypes: {
    url: {
      type: 'string',
    },
    brand: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
} as Meta;

type Story = StoryObj<typeof GoodsCard>;

export const Default: Story = {
  args: {
    name: '세븐일레븐 10000원 기프트카드',
    url: '/seven-eleven.jpg',
    price: 10000,
    brand: '세븐일레븐',
  },
};
