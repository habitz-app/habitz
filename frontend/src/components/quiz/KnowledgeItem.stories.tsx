import type { Meta, StoryObj } from '@storybook/react';
import KnowledgeItem from './KnowledgeItem';

export default {
  title: 'KnowledgeItem',
  component: KnowledgeItem,
  argTypes: {
    title: {
      type: 'string',
    },
    contents: {
      type: 'string',
    },
  },
} as Meta;

type Story = StoryObj<typeof KnowledgeItem>;

export const Default: Story = {
  args: {
    title: '소화기는 어떻게 사용할까요?',
    contents:
      '건조한 봄 날씨에는 불이 나기 쉬워요. 화재가 발생하고 5분이 지나면 불길이 번지는 속도가 급격하게 빨라져요',
  },
};
