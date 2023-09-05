import Vue from 'vue';
import 'homeday-blocks/src/styles/main.scss';

import '@storybook/addon-console';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import HdTooltipInstaller from 'homeday-blocks/src/components/tooltip/HdTooltipInstaller';

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
};
