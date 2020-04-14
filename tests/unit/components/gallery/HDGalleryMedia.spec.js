import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryMedia from '@/components/gallery/HdGalleryMedia.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

const wrapperBuilder = wrapperFactoryBuilder(HdGalleryMedia, {
  props: {
    item: ITEMS[0],
  },
});

describe('HdGalleryMedia', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
