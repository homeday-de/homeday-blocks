import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryPlaceholder from '@/components/gallery/HdGalleryPlaceholder.vue';

const wrapperFactory = wrapperFactoryBuilder(HdGalleryPlaceholder, {
  props: {
    icon: '',
    text: '',
  },
});

describe('HdGalleryPlaceholder', () => {
  const build = (props) => {
    const wrapper = wrapperFactory({ props });

    return {
      wrapper,
      img: () => wrapper.find('img'),
    };
  };

  it('renders placeholder content', () => {
    const expectedIcon = 'src/assets/icons/ic-error.svg';
    const expectedText = 'Foo Fighters is an American rock band, formed in Seattle';
    const { wrapper, img } = build({
      icon: expectedIcon,
      text: expectedText,
    });

    expect(wrapper.text()).toContain(expectedText);
    expect(img().attributes().src).toBe(expectedIcon);
  });
});
