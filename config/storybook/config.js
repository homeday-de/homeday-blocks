/* eslint-disable import/no-extraneous-dependencies */
import 'hd-blocks/styles/main.scss';
import { configure, addParameters, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import '@storybook/addon-console';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import tooltipInstall from 'hd-blocks/components/tooltip/installer';
import HdTheme from './themes/HdTheme';

tooltipInstall();

addParameters({
  options: {
    theme: HdTheme,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});


addDecorator(withKnobs);


function loadStories() {
  // We manualy import the welcome story as the first one
  // to make sure it's always on top of the sidebar and treated as our `index`
  // eslint-disable-next-line global-require
  require('../../src/stories/WelcomeStory');

  // Import all the stories that end with *.stories.js
  const req = require.context('../../src/stories', true, /.stories.js$/);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
