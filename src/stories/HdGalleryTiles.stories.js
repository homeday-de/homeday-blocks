/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdGalleryTiles from 'hd-blocks/components/gallery/HdGalleryTiles.vue';
import SizedContainerWrapper from 'hd-blocks/storiesWrappers/SizedContainerWrapper';
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
  }));
