import type { Meta, StoryObj } from '@storybook/react';
import ApprovalProfile from './ApprovalProfile';
export default {
  title: 'ApprovalProfile',
  component: ApprovalProfile,
  argTypes: {
    name: {
      type: 'string',
    },
    src: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof ApprovalProfile>;

export const Default: Story = {
  args: {
    name: '김싸피',
    src: 'https://th.bing.com/th/id/OIG3.XjJC_rWVtDY_8a5.T.ux?w=1024&h=1024&rs=1&pid=ImgDetMain',
  },
};
