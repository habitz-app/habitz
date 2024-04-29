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
};

export const Quiz: Story = {
  args: {
    menu: 'quiz',
  },
};

export const Mission: Story = {
  args: {
    menu: 'mission',
  },
};

export const Store: Story = {
  args: {
    menu: 'store',
  },
};

export const Menu: Story = {
  args: {
    menu: 'menu',
  },
};
