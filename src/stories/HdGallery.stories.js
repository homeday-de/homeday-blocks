/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdGallery from 'hd-blocks/components/gallery/HdGallery.vue';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('HdGallery', module)
  .add('default', () => ({
    components: { HdGallery },
    template: `
      <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
        <HdGallery
          :items="items"
          @input="onInput"
        />
      </div>
    `,
    data() {
      return {
        items: ITEMS,
      };
    },
    methods: {
      onInput(value) {
        action('input')(value);
      },
    },
  }));
