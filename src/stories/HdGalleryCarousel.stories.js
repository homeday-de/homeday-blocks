import { HdGalleryCarousel } from 'homeday-blocks';
import { pictures as picturesIcon } from 'homeday-assets/L';
import ITEMS from './mocks/GALLERY_ITEMS';

export default {
  title: 'Components/Gallery/HdGalleryCarousel',
  component: HdGalleryCarousel,
  argTypes: {
    items: {
      type: 'object',
    },
    carouselItemClick: {
      action: 'carouselItemClicked',
    },
    currentItemClick: {
      action: 'currentItemClicked',
    },
    input: {
      action: 'input',
    },
  },
  args: {
    items: ITEMS,
    pagerInside: false,
    disableKeyEvents: false,
    showCaption: true,
    startIndex: 0,
    carouselObjectFit: 'cover',
    placeholderText: 'Nothing to show',
    placeholderIcon: picturesIcon,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdGalleryCarousel },
  template: `
    <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
    <HdGalleryCarousel
      :items="items"
      :pager-inside="pagerInside"
      :aspect-ratio="aspectRatio"
      :disable-key-events="disableKeyEvents"
      :start-index="startIndex"
      :show-caption="showCaption"
      :placeholder-icon="placeholderIcon"
      :placeholder-text="placeholderText"
      :carousel-object-fit="carouselObjectFit"
      @carouselItemClick="carouselItemClick"
      @currentItemClick="currentItemClick"
      @input="input"
    />
    </div>
  `,
});

export const Default = Template.bind({});

export const Slot = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdGalleryCarousel },
  template: `
    <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
    <HdGalleryCarousel
      :pager-inside="pagerInside"
      :aspect-ratio="aspectRatio"
      :disable-key-events="disableKeyEvents"
      :start-index="startIndex"
      :show-caption="showCaption"
      :placeholder-icon="placeholderIcon"
      :placeholder-text="placeholderText"
      :carousel-object-fit="carouselObjectFit"
      @carouselItemClick="carouselItemClick"
      @currentItemClick="currentItemClick"
      @input="input">
      <div style="width: 100%;" v-for="(item, index) in items">This is item #{{ index }}</div>
    </HdGalleryCarousel>
    </div>
  `,
});
