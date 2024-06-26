import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    '../public',
    {
      from: '../public/fonts',
      to: 'public/fonts',
    },
  ],
  webpackFinal: async config => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.resolve.alias['styled-system'] = path.resolve(__dirname, '../styled-system');
    return config;
  },
};
export default config;
