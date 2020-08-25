import _ from 'lodash';
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdGalleryPlaceholder from '@/components/gallery/HdGalleryPlaceholder.vue';

describe('HdGalleryPlaceholder', () => {
  const build = (props = {}) => {
    const wrapper = wrapperFactoryBuilder(HdGalleryPlaceholder, {
      props: _.merge({
        icon: '',
        text: '',
      }, props),
    })();

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
