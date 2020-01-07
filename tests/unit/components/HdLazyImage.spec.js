import { mount } from '@vue/test-utils';
import HdLazyImage from '@/components/HdLazyImage.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdLazyImage', () => {
  it('renders with the image as background', () => {
    const wrapper = mount(HdLazyImage, {
      src: ITEMS[0].image,
      background: true,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with the image as picture element, sources and source set', () => {
    const wrapper = mount(HdLazyImage, {
      src: ITEMS[3].image,
      srcset: ITEMS[3].imageSrcSet,
      srcSmall: ITEMS[3].thumbnail,
      pictureSources: ITEMS[3].pictureSources,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
