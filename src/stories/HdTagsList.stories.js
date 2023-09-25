/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { array } from '@storybook/addon-knobs';
import HdTagsList from 'homeday-blocks/src/components/HdTagsList.vue';
import ITEMS from './mocks/FORM_ITEMS';

storiesOf('Components/Content/HdTagsList', module).add('default 🎛', () => ({
  components: { HdTagsList },
  template: `
      <hd-tags-list
        :items="items"
      />
    `,
  props: {
    items: {
      type: Array,
      default: array(
        'items',
        ITEMS.map(({ label }) => label)
      ),
    },
  },
}));
