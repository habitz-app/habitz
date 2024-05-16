import type { Meta, StoryObj } from '@storybook/react';
import inputLabeled from './InputLabeled';
export default {
  title: 'inputLabeled',
  component: inputLabeled,
  argTypes: {
    label: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    emoji: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof inputLabeled>;

export const Default: Story = {
  args: {
    label: '라벨',
    placeholder: '플레이스 홀더',
    emoji: '😀',
    setEmoji: () => {},
    id: 'default',
    inputValue: '입력값',
    setInputValue: () => {},
  },
};
