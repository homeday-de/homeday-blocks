/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdInfoBox from 'hd-blocks/components/HdInfoBox.vue';

storiesOf('HdInfoBox', module)
  .add('default', () => ({
    components: { HdInfoBox },
    template: `
      <HdInfoBox message="I am an info message, hello hello"/>
    `,
  }));
