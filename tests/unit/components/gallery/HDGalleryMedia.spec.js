import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryMedia from '@/components/gallery/HdGalleryMedia.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

const wrapperFactory = wrapperFactoryBuilder(HdGalleryMedia, {
  props: {
    item: ITEMS[0],
  },
});

describe('HdGalleryMedia', () => {
  const build = (props) => {
    const wrapper = wrapperFactory({ props });

    return {
      wrapper,
      img: () => wrapper.find('img'),
      thumbnail: () => wrapper.find('.gallery-media__object-thumbnail'),
    };
  };

  it('renders component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('hides the thumbnail when it is not provided', async () => {
    const itemWithoutThumb = { ...ITEMS[0], thumbnail: null };
    const { thumbnail } = build({ item: itemWithoutThumb });

    expect(thumbnail().exists()).toBe(false);
  });

  it('shows thumbnail when item changes', async () => {
    const expectedItem = ITEMS[0];
    const newPictureWithSameImage = {
      ...ITEMS[0],
      caption: 'Same Image',
    };
    const newPictureWithDifferentImage = ITEMS[1];

    const { wrapper, thumbnail, img } = build({ item: expectedItem });

    // load component
    expect(thumbnail().classes()).toContain('isVisible');

    img().trigger('load');
    await wrapper.vm.$nextTick();

    expect(thumbnail().classes()).not.toContain('isVisible');

    // change item with the same image
    wrapper.setProps({
      item: newPictureWithSameImage,
    });
    await wrapper.vm.$nextTick();

    expect(thumbnail().classes()).not.toContain('isVisible');

    // change item with a different image
    wrapper.setProps({
      item: newPictureWithDifferentImage,
    });
    await wrapper.vm.$nextTick();

    expect(thumbnail().classes()).toContain('isVisible');
  });
});
