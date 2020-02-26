/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { HdGallery } from 'homeday-blocks';
import ITEMS from './mocks/GALLERY_ITEMS';

storiesOf('Gallery/HdGallery', module)
  .add('default', () => ({
    components: { HdGallery },
    template: `
      <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
      <HdGallery
        :items="items"
        :show-caption="true"
        @carouselItemClick="onCarouselItemClick"
        @currentItemClick="onCurrentItemClick"
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
      onCurrentItemClick(value) {
        action('onCurrentItemClick')(value);
      },
    },
  }))
  .add('one photo', () => ({
    components: { HdGallery },
    template: `
      <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
      <HdGallery
        :items="items"
        :show-caption="false"
        @carouselItemClick="onCarouselItemClick"
        @currentItemClick="onCurrentItemClick"
      />
      </div>
    `,
    data() {
      return {
        items: [
          ITEMS[0],
        ],
      };
    },
    methods: {
      onCurrentItemClick(value) {
        action('onCurrentItemClick')(value);
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
        <h3 class='hide-in-percy'>Check on mobile viewport</h3>
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
  }), { percy: { widths: [375] } });
