import type { Meta, StoryObj } from '@storybook/react';
import QuizQuestion from './QuizQuestion';

export default {
  title: 'QuizQuestion',
  component: QuizQuestion,
  argTypes: {
    content: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof QuizQuestion>;

export const Default: Story = {
  args: {
    content: '딸기는 과일이다',
  },
};
