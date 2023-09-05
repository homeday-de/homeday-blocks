import Vue from 'vue';
import '@storybook/addon-console';
import 'homeday-blocks/src/styles/main.scss';
import HdTheme from './themes/HdTheme';
import HdTooltipInstaller from 'homeday-blocks/src/components/tooltip/HdTooltipInstaller';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

Vue.use(HdTooltipInstaller);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Introduction', 'Welcome', 'Guidelines', 'Components', 'Directives', 'Services'],
    },
    showPanel: true,
    isToolshown: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  features: {
    previewMdx2: true,
  },
  parameters: {
    docs: {
      theme: HdTheme,
    },
  },
};
