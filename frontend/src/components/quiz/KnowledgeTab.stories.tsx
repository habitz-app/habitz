import type { Meta, StoryObj } from '@storybook/react';
import KnowledgeTab from './KnowledgeTab';

export default {
  title: 'KnowledgeTab',
  component: KnowledgeTab,
  argTypes: {
    options: {
      control: {
        type: 'object',
      },
    },
  },
} as Meta;

type Story = StoryObj<typeof KnowledgeTab>;

export const Default: Story = {
  args: {
    options: [
      {
        id: 'lifeCategory',
        label: '생활/습관',
        items: [
          {
            title: '생활/습관',
            content: '생활/습관',
          },
        ],
      },
      {
        id: 'financeCategory',
        label: '금융/재테크',
        items: [
          {
            title: '금융/재테크',
            content: '금융/재테크',
          },
        ],
      },
      {
        id: 'defaultCategory',
        label: '기초상식',
        items: [
          {
            title: '기초상식',
            content: '기초상식',
          },
        ],
      },
    ],
  },
};
