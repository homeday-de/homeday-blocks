/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import HdTagsSelector from 'homeday-blocks/src/components/form/HdTagsSelector.vue';
import ITEMS from './mocks/FORM_ITEMS';

storiesOf('Components/Form/HdTagsSelector', module).add('prefilled', () => ({
  components: { HdTagsSelector },
  template: `
      <hd-tags-selector
        v-model="selectedItems"
        :items="allItems"
      />
    `,
  data() {
    return {
      selectedItems: [ITEMS[0], ITEMS[2]],
      allItems: ITEMS,
    };
  },
  watch: {
    selectedItems(selectedItems) {
      action('selectedItems')(selectedItems);
    },
  },
}));
