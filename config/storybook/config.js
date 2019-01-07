/* eslint-disable import/no-extraneous-dependencies */
import 'styleguide/src/main.scss';
import { configure, addDecorator } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import '@storybook/addon-console';

import tooltipInstall from 'hd-blocks-src/components/tooltip/installer';

tooltipInstall();

addDecorator(withNotes);
addDecorator(withKnobs);

const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
