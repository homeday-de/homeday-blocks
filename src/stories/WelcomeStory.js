/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Welcome from './Welcome.vue';

storiesOf('Introduction/Welcome', module)
  .addParameters({
    options: {
      showPanel: false,
      isToolshown: false,
    },
    percy: {
      skip: true,
    },
  })
  .add('Welcome', () => ({
    components: {
      Welcome,
    },
    template: `
    <Welcome />
    `,
  }));
