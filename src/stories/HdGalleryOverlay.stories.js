/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { HdGalleryOverlay } from 'homeday-blocks';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('Components|Gallery/HdGalleryOverlay', module)
  .addParameters({ percy: { skip: true } })
  .add('default', () => ({
    components: { HdGalleryOverlay },
    template: `
      <div style="display: flex; height: calc(100vh - 16px); align-items: center; justify-content: center;">
      <button @click="showOverlay">Show overlay</button>
      <HdGalleryOverlay
        v-if="visible"
        :items="items"
        :start-index="0"
        @close="onClose"
      />
      </div>
    `,
    data() {
      return {
        items: ITEMS,
        visible: false,
      };
    },
    methods: {
      showOverlay() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
  }));
