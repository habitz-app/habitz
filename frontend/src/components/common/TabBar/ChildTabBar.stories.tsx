import type { Meta, StoryObj } from '@storybook/react';
import ChildTabBar from './ChildTabBar';

export default {
  title: 'ChildTabBar',
  component: ChildTabBar,
  argTypes: {
    menu: {
      control: 'select',
      options: ['home', 'quiz', 'mission', 'store', 'menu'],
    },
  },
} as Meta;

type Story = StoryObj<typeof ChildTabBar>;

export const Home: Story = {
  args: {
    menu: 'home',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Quiz: Story = {
  args: {
    menu: 'quiz',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Mission: Story = {
  args: {
    menu: 'mission',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Store: Story = {
  args: {
    menu: 'store',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Menu: Story = {
  args: {
    menu: 'menu',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
