import type { Meta, StoryObj } from '@storybook/react';
import Article from './Article';

export default {
  title: 'Article',
  component: Article,
  argTypes: {
    title: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    contents: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof Article>;

export const Default: Story = {
  args: {
    title: '새콤달콤한 딸기가 채소라고?과일과 채소의 기준이 뭘까?',
    date: '2024-04-23',
    contents: '',
  },
};
