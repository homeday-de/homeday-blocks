import HdGallery from 'homeday-blocks/src/components/gallery/HdGallery.vue';
import { pictures as picturesIcon } from 'homeday-assets/L';
import ITEMS from './mocks/GALLERY_ITEMS';

export default {
  title: 'Components/Gallery/HdGallery',
  component: HdGallery,
  argTypes: {
    items: {
      table: {
        type: {
          summary: 'array of objects',
          detail: `
{
  caption: string,
  image: string,
  thumbnail: string,
  pictureSources: {
    string: string (e.g: 'max-width: 600px': 'https://dummyimage.com/306x172?text=1+mw+600px')
  },
  thumbnailPictureSources: {
    string: string (e.g: 'max-width: 600px': 'https://dummyimage.com/306x172?text=1+mw+600px')
  },
}
          `,
        },
      },
      control: {
        type: 'object',
      },
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
    mobileCounterBadge: false,
  },
  parameters: { percy: { widths: [375] } },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdGallery },
  template: `
    <div style="max-width: 800px; padding-left: 16px; padding-right: 16px; margin: auto;">
    <HdGallery
      v-bind="$props"
    />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  carouselObjectFit: 'cover',
};

export const OnePhoto = Template.bind({});
OnePhoto.args = {
  items: [
    ITEMS[0],
  ],
};

export const NoPhotos = Template.bind({});
NoPhotos.args = {
  items: [],
  placeholderText: 'No photos',
  placeholderIcon: picturesIcon,
};

export const WithPagerInside = Template.bind({});
WithPagerInside.args = {
  pagerInside: true,
  showCaption: false,
};

export const WithMobileCounterBadge = Template.bind({});
WithMobileCounterBadge.args = {
  mobileCounterBadge: true,
};
