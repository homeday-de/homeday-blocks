/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdGalleryTiles from 'homeday-blocks/src/components/gallery/HdGalleryTiles.vue';
import SizedContainerWrapper from 'homeday-blocks/src/storiesWrappers/SizedContainerWrapper';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('Gallery/HdGalleryTiles', module)
  .addDecorator(SizedContainerWrapper)
  .add('default', () => ({
    components: { HdGalleryTiles },
    template: `
    <HdGalleryTiles
      :items="items"
      class="expose__gallery expose__gallery--tiles"
      @itemClick="onItemClick"
    />
  `,
    data() {
      return {
        items: ITEMS,
        visible: false,
      };
    },
    methods: {
      onItemClick(itemIndex) {
        action('itemClicked')(itemIndex);
      },
    },
  }))
  .add('3 images', () => ({
    components: { HdGalleryTiles },
    template: `
    <HdGalleryTiles
      :items="items"
      class="expose__gallery expose__gallery--tiles"
      @itemClick="onItemClick"
    />
  `,
    data() {
      return {
        items: ITEMS.slice(0, 3),
        visible: false,
      };
    },
    methods: {
      onItemClick(itemIndex) {
        action('itemClicked')(itemIndex);
      },
    },
  }))
  .add('2 images', () => ({
    components: { HdGalleryTiles },
    template: `
    <HdGalleryTiles
      :items="items"
      class="expose__gallery expose__gallery--tiles"
      @itemClick="onItemClick"
    />
  `,
    data() {
      return {
        items: ITEMS.slice(0, 2),
        visible: false,
      };
    },
    methods: {
      onItemClick(itemIndex) {
        action('itemClicked')(itemIndex);
      },
    },
  }));
