import type { Meta, StoryObj } from '@storybook/react';
import GoodsItem from './GoodsItem';

export default {
  title: 'GoodsItem',
  component: GoodsItem,
  argTypes: {
    name: { type: 'string' },
    brand: { type: 'string' },
    url: { type: 'string' },
    price: { type: 'number' },
  },
} as Meta;

type Story = StoryObj<typeof GoodsItem>;

export const Default: Story = {
  args: {
    name: '캐치티니핑 캔디콤팩트 캐치티니핑 캔디콤팩트',
    brand: '티니핑',
    url: '/coin.svg',
    price: 2880,
  },
};
