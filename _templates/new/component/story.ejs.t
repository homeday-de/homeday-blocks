---
to: src/stories/<%= name %>.stories.js
---
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { <%= name %> } from 'homeday-blocks';

const stories = storiesOf('Components|<%= name %>', module);

stories.add('Default', () => ({
  components: { <%= name %> },
  template: `
    <<%= name %> />
  `,
}));
