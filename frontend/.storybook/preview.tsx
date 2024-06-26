import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css';
import { Pretendard, Yeoljeong } from '../src/app/fonts';

const customViewports = {
  android: {
    name: 'Android Large',
    styles: {
      width: '360px',
      height: '800px',
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: customViewports,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#fafaf9',
        },
      ],
    },
  },

  decorators: [
    (Story) => (
      <div className={`${Pretendard.variable} ${Yeoljeong.variable}`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
