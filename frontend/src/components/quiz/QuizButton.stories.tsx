import type { Meta, StoryObj } from '@storybook/react';
import QuizButton from './QuizButton';

export default {
  title: 'QuizButton',
  component: QuizButton,
  argTypes: {
    option: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof QuizButton>;

export const O: Story = {
  args: {
    option: 'O',
  },
};

export const X: Story = {
  args: {
    option: 'X',
  },
};
