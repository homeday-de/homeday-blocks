import { mount } from '@vue/test-utils';
import HdLink, { TYPES } from '@/components/HdLink.vue';

describe('HdLink', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdLink, {
      slots: {
        default: '<span>Text</span>',
      },
    });
  });

  it('should have link class', () => {
    expect(wrapper.classes()).toContain('link');
    expect(wrapper.classes()).toContain('link--primary');
    expect(wrapper.html()).toMatchSnapshot();
  });

  TYPES.forEach((modifier) => {
    it(`should render link--${modifier}`, () => {
      wrapper.setProps({
        modifier,
      });

      expect(wrapper.classes()).toContain(`link--${modifier}`);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });


  it('should render <router-link> on :to', () => {
    const to = 'www.homeday.de';

    wrapper.setProps({
      to,
    });

    expect(wrapper.is('router-link')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
