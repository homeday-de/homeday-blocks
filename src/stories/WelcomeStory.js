/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import Welcome from './Welcome.vue';

storiesOf('Introduction|Welcome', module)
  .addParameters({ percy: { skip: true } })
  .add('Welcome', () => ({
    components: {
      Welcome,
    },
    template: `
    <Welcome />
    `,
  }),
  {
    options: {
      showPanel: false,
      isToolshown: false,
    },
  });
