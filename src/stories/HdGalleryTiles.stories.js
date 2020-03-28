/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import SizedContainerWrapper from 'homeday-blocks/src/storiesWrappers/SizedContainerWrapper';
import { HdGalleryTiles } from 'homeday-blocks';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('Components|Gallery/HdGalleryTiles', module)
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
  }))
  .add('default with image elements', () => ({
    components: { HdGalleryTiles },
    template: `
    <HdGalleryTiles
      :items="items"
      class="expose__gallery expose__gallery--tiles"
      @itemClick="onItemClick"
      :background="false"
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
  }));
