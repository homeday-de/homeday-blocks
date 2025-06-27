/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import SizedContainerWrapper from 'homeday-blocks/src/storiesWrappers/SizedContainerWrapper';
import HdGalleryTiles from 'homeday-blocks/src/components/gallery/HdGalleryTiles.vue';
import ITEMS from './mocks/GALLERY_ITEMS';

export default {
  title: 'Components/Images/HdGalleryTiles',
  decorators: [SizedContainerWrapper],
};

export const Default = {
  render: () => ({
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
  }),

  name: 'default',
};

export const ThreeImages = {
  render: () => ({
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
  }),

  name: '3 images',
};

export const TwoImages = {
  render: () => ({
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
  }),

  name: '2 images',
};

export const DefaultWithImageElements = {
  render: () => ({
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
  }),

  name: 'default with image elements',
};
