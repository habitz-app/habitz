import type { Meta, StoryObj } from '@storybook/react';
import ProfileCard from './ProfileCard';

export default {
  title: 'ProfileCard',
  component: ProfileCard,
  argTypes:{
    point : {
      type: 'number'
    }
  }
} as Meta;

type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: {
    point: 123456789
  }
}
