import _ from 'lodash';
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryMedia from '@/components/gallery/HdGalleryMedia.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdGalleryMedia', () => {
  const build = (props = {}) => {
    const wrapper = wrapperFactoryBuilder(HdGalleryMedia, {
      props: _.merge({
        item: ITEMS[0],
      }, props),
    })();

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

  it('hides the thumbnail when the image is loaded', async () => {
    const { wrapper, img, thumbnail } = build();

    expect(thumbnail().classes()).toContain('isVisible');

    img().trigger('load');
    await wrapper.vm.$nextTick();

    expect(thumbnail().classes()).not.toContain('isVisible');
  });

  it('hides the thumbnail when is not provided', async () => {
    const itemWithoutThumb = { ...ITEMS[0], thumbnail: null };
    const { thumbnail } = build({ item: itemWithoutThumb });

    expect(thumbnail().exists()).toBe(false);
  });
});
