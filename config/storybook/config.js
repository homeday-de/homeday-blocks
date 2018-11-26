/* eslint-disable import/no-extraneous-dependencies */
import 'styleguide/src/main.scss';
import { configure, addDecorator } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withNotes);
const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
