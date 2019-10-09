/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Welcome from './Welcome.vue';
import README from '../../README.md';

storiesOf('Welcome', module)
  .add('Welcome', () => ({
    components: {
      Welcome,
    },
    template: `
    <Welcome />
    `,
  }),
  {
    notes: {
      markdown: README,
    },
  });
