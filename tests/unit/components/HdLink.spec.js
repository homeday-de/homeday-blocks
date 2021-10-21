import { RouterLinkStub } from '@vue/test-utils';
import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdLink, { TYPES } from '@/components/HdLink.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdLink, {
  slots: {
    default: '<span>Text</span>',
  },
  stubs: {
    RouterLink: RouterLinkStub,
  },
});

describe('HdLink', () => {
  it('should have link class', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes()).toContain('hd-link');
    expect(wrapper.classes()).toContain('hd-link--primary');
    expect(wrapper.html()).toMatchSnapshot();
  });

  TYPES.forEach((modifier) => {
    it(`should render hd-link--${modifier}`, () => {
      const wrapper = wrapperBuilder({
        props: {
          modifier,
        },
      });

      expect(wrapper.classes()).toContain(`hd-link--${modifier}`);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  it('should render <router-link> on :to', () => {
    const to = 'www.homeday.de';
    const wrapper = wrapperBuilder({
      props: {
        to,
      },
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
