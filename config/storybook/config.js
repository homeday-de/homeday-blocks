/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue';
import '@storybook/addon-console';
import '@/styles/main.scss';

const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
