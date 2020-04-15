import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryCarousel from '@/components/gallery/HdGalleryCarousel.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

const GALLERY_ITEM_SELECTOR = '.gallery-carousel__item';

const wrapperBuilder = wrapperFactoryBuilder(HdGalleryCarousel, {
  props: {
    items: ITEMS,
  },
});

describe('HdGalleryCarousel', () => {
  it('should render as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render items correctly', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(GALLERY_ITEM_SELECTOR).length).toEqual(ITEMS.length);
  });
});
