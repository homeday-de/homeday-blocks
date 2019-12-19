import { mount } from '@vue/test-utils';
import HdGalleryCarousel from '@/components/gallery/HdGalleryCarousel.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdGalleryCarousel', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdGalleryCarousel, {
      propsData: {
        items: ITEMS,
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
