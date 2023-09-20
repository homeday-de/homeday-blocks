import Vue from 'vue';
import '@storybook/addon-console';
import 'homeday-blocks/src/styles/main.scss';

// These styles are used only to style the documentation examples.
import 'homeday-blocks/src/stories/styles/stories.scss';

import HdTheme from './themes/HdTheme';
import HdTooltipInstaller from 'homeday-blocks/src/components/tooltip/HdTooltipInstaller';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

Vue.use(HdTooltipInstaller);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        'Welcome',
        'Guidelines',
        ['Colors', 'Elevation', 'Spacing', 'Typography', 'Icons & Illustrations'],
        'Components',
        'Directives',
        'Services',
      ],
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
