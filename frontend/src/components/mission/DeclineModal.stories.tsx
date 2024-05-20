import type { Meta, StoryObj } from '@storybook/react';
import DeclineModal from './DeclineModal';
export default {
  title: 'DeclineModal',
  component: DeclineModal,
  argTypes: {
    cancelHandler: {
      type: 'function',
    },
    declineHandler: {
      type: 'function',
    },
  },
} as Meta;

type Story = StoryObj<typeof DeclineModal>;

export const Default: Story = {
  args: {
    cancelHandler: () => {},
    declineHandler: (content: string) => {},
  },
};
