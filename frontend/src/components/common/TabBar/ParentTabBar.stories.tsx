import type { Meta, StoryObj } from '@storybook/react';
import ParentTabBar from './ParentTabBar';

export default {
  title: 'ParentTabBar',
  component: ParentTabBar,
  argTypes: {
    menu: {
      control: 'select',
      options: ['home', 'child', 'mission', 'store', 'menu'],
    },
  },
} as Meta;

type Story = StoryObj<typeof ParentTabBar>;

export const Home: Story = {
  args: {
    menu: 'home',
  },
};

export const Child: Story = {
  args: {
    menu: 'child',
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
