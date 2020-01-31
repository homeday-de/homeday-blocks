import { mount } from '@vue/test-utils';
import HdLazyImage from '@/components/HdLazyImage.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

describe('HdLazyImage', () => {
  let wrapper;
  const sampleImage = ITEMS[2];

  beforeEach(() => {
    wrapper = mount(HdLazyImage, {
      propsData: {
        src: sampleImage.image,
        srcSmall: sampleImage.thumbnail,
        background: false,
      },
    });
  });

  it('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
