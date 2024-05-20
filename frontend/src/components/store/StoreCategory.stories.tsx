import type { Meta, StoryObj } from '@storybook/react';
import StoreCategory from './StoreCategory';

export default {
  title: 'StoreCategory',
  component: StoreCategory,
  argTypes: {
    type: {
      control: 'select',
      options: ['toy', 'book', 'stationery', 'convenienceStore', 'iceCream'],
    },
    name: {
      control: 'text',
    },
  },
} as Meta;

type Story = StoryObj<typeof StoreCategory>;

export const Toy: Story = {
  args: {
    type: 'toy',
    name: '장난감/인형',
  },
};

export const Book: Story = {
  args: {
    type: 'book',
    name: '도서/동화책',
  },
};

export const Stationery: Story = {
  args: {
    type: 'stationery',
    name: '문구류',
  },
};

export const ConvenienceStore: Story = {
  args: {
    type: 'convenienceStore',
    name: '편의점',
  },
};

export const IceCream: Story = {
  args: {
    type: 'iceCream',
    name: '음료/아이스크림',
  },
};
