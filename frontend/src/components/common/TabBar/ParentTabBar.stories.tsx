import type { Meta, StoryObj } from '@storybook/react';
import ParentTabBar from './ParentTabBar';

export default {
  title: 'ParentTabBar',
  component: ParentTabBar,
  argTypes: {
    menu: {
      control: 'select',
      options: ['home', 'child', 'mission', 'store', 'more'],
    },
  },
} as Meta;

type Story = StoryObj<typeof ParentTabBar>;

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

export const Child: Story = {
  args: {
    menu: 'child',
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
    menu: 'more',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
