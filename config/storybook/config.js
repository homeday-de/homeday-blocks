/* eslint-disable import/no-extraneous-dependencies */
import 'hd-blocks/styles/main.scss';
import { configure, addParameters, addDecorator } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import '@storybook/addon-console';

import tooltipInstall from 'hd-blocks/components/tooltip/installer';
import HdTheme from './themes/HdTheme';

tooltipInstall();

addParameters({
  options: {
    theme: HdTheme,
  },
});

addDecorator(withKnobs);

const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
