import 'homeday-blocks/src/styles/main.scss';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { HdTooltipInstaller } from 'homeday-blocks';

HdTooltipInstaller();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        'Introduction'
      ]
    },
    showPanel: true,
    isToolshown: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}
