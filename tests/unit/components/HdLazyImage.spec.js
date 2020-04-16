import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdLazyImage from '@/components/HdLazyImage.vue';
import ITEMS from '@/stories/mocks/GALLERY_ITEMS';

const sampleImage = ITEMS[2];

const wrapperBuilder = wrapperFactoryBuilder(HdLazyImage, {
  props: {
    src: sampleImage.image,
    srcSmall: sampleImage.thumbnail,
    background: false,
  },
});

describe('HdLazyImage', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
