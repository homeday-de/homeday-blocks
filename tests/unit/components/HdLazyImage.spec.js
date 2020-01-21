import { mount } from '@vue/test-utils';
import HdLazyImage from '@/components/HdLazyImage.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdLazyImage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdLazyImage, {
      propsData: {
        src: ITEMS[0].image,
        background: true,
      },
    });
  });

  it('renders the image as background of a div', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders with the image as picture element, sources and source set', () => {
    wrapper.setProps({
      src: ITEMS[3].image,
      srcset: ITEMS[3].imageSrcSet,
      srcSmall: ITEMS[3].thumbnail,
      pictureSources: ITEMS[3].pictureSources,
      background: false,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
