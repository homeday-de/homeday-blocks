/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdTagsSelector from 'homeday-blocks/src/components/form/HdTagsSelector.vue';
import ITEMS from './mocks/FORM_ITEMS';

export default {
  title: 'Components/Selection Controls/HdTagsSelector',
};

export const Prefilled = {
  render: () => ({
    components: { HdTagsSelector },
    template: `
        <hd-tags-selector
          name="tags-selector"
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
  }),

  name: 'prefilled',
};
