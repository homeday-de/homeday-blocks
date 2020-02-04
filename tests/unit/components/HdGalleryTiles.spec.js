import { mount } from '@vue/test-utils';
import HdGalleryTiles from '@/components/gallery/HdGalleryTiles.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdGalleryTiles', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdGalleryTiles, {
      propsData: {
        item: ITEMS,
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
