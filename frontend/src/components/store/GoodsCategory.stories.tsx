import type { Meta, StoryObj } from '@storybook/react';
import GoodsCategory from './GoodsCategory';

export default {
  title: 'GoodsCategory',
  component: GoodsCategory,
  argTypes: {
    url: {
      type: 'string',
    },
    brand: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof GoodsCategory>;

export const CU: Story = {
  args: {
    url: '/CU.jpg',
    brand: 'CU',
  },
};

export const GS25: Story = {
  args: {
    url: '/GS25.png',
    brand: 'GS25',
  },
};

export const Emart24: Story = {
  args: {
    url: '/emart24.png',
    brand: '이마트24',
  },
};

export const SevenEleven: Story = {
  args: {
    url: '/seven-eleven.jpg',
    brand: '세븐일레븐',
  },
};
