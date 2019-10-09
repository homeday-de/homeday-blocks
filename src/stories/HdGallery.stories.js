/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import HdGallery from 'hd-blocks/components/gallery/HdGallery.vue';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('Gallery/HdGallery', module)
  .add('default', () => ({
    components: { HdGallery },
    template: `
      <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
      <HdGallery
        :items="items"
        :show-caption="false"
        @carouselItemClick="onCarouselItemClick"
      />
      </div>
    `,
    data() {
      return {
        items: ITEMS,
      };
    },
    methods: {
      onCarouselItemClick(value) {
        action('onCarouselItemClick')(value);
      },
    },
  }))
  .add('no photos 🎛', () => ({
    components: { HdGallery },
    template: `
      <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
      <HdGallery
        :items="[]"
        :placeholder-text="placeholderText"
      />
      </div>
    `,
    props: {
      placeholderText: {
        type: String,
        default: text('Placholder Text', 'No photos'),
      },
    },
  }))
  .add('with pager inside', () => ({
    components: { HdGallery },
    template: `
      <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
      <h3>Check on mobile viewport</h3>
      <HdGallery
        :items="items"
        :show-caption="false"
        :pager-inside="true"
      />
      </div>
    `,
    data() {
      return {
        items: ITEMS,
      };
    },
  }));
