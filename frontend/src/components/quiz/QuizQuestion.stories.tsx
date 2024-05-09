import type { Meta, StoryObj } from '@storybook/react';
import QuizQuestion from './QuizQuestion';

export default {
  title: 'QuizQuestion',
  component: QuizQuestion,
  argTypes: {
    content: {
      type: 'string',
    },
    isSolved: {
      type: 'boolean',
    },
    correct: {
      type: 'boolean',
    },
    articleId: {
      type: 'number',
    },
  },
} as Meta;

type Story = StoryObj<typeof QuizQuestion>;

export const Default: Story = {
  args: {
    content: '딸기는 과일이다',
    isSolved: false,
    correct: false,
    articleId: 1,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Correct: Story = {
  args: {
    content: '딸기는 과일이다',
    isSolved: true,
    correct: true,
    articleId: 1,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Wrong: Story = {
  args: {
    content: '딸기는 과일이다',
    isSolved: true,
    correct: false,
    articleId: 1,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
