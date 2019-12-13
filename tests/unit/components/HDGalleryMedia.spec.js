import { mount } from '@vue/test-utils';
import HdGalleryMedia from '@/components/gallery/HdGalleryMedia.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdGalleryMedia', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdGalleryMedia, {
      propsData: {
        item: ITEMS[0],
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
