import type { Meta, StoryObj } from '@storybook/react';
import emojiPopover from './EmojiPopover';
export default {
  title: 'emojiPopover',
  component: emojiPopover,
  argTypes: {
    emoji: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof emojiPopover>;

export const Default: Story = {
  args: {
    emoji: '👍',
    setEmoji: () => {},
  },
};
