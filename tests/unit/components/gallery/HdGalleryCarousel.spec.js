import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryCarousel from '@/components/gallery/HdGalleryCarousel.vue';

const GALLERY_ITEM_SELECTOR = '.gallery-carousel__item';

const TEST_ITEM = {
  caption: 'test',
  image: 'http://placehold.it/10x10',
  thumbnail: 'http://placehold.it/10x10',
};

describe('HdGalleryCarousel', () => {
  const testItems = new Array(3).fill(TEST_ITEM);

  const wrapperFactory = wrapperFactoryBuilder(
    HdGalleryCarousel, {
      propsData: {
        items: testItems,
      },
    },
  );

  let wrapper;
  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  it('should render as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render items correctly', () => {
    expect(wrapper.findAll(GALLERY_ITEM_SELECTOR).length).toEqual(testItems.length);
  });
});
