/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';

import HdTagsList from 'hd-blocks/components/HdTagsList.vue';
import ITEMS from './mocks/FORM_ITEMS';


storiesOf('HdTagsList', module)
  .add('default', () => ({
    components: { HdTagsList },
    template: `
      <hd-tags-list
        :items="items"
      />
    `,
    data() {
      return {
        items: ITEMS.map(({ label }) => label),
      };
    },
  }));
