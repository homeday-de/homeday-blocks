/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Welcome from './Welcome.vue';

storiesOf('Welcome', module)
  .add('Welcome', () => ({
    components: {
      Welcome,
    },
    template: `
    <Welcome />
    `,
  }));
