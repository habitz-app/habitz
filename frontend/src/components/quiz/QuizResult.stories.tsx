import type { Meta, StoryObj } from '@storybook/react';
import QuizResult from './QuizResult';

export default {
  title: 'QuizResult',
  component: QuizResult,
  argTypes: {
    isCorrect: {
      type: 'boolean',
    },
    points: {
      type: 'number',
    },
  },
} as Meta;

type Story = StoryObj<typeof QuizResult>;

export const Correct: Story = {
  args: {
    isCorrect: true,
    points: 10,
  },
};

export const Wrong: Story = {
  args: {
    isCorrect: false,
    points: 0,
  },
};
