import { mount } from '@vue/test-utils';
import HdLink from '@/components/HdLink.vue';

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

  it('should render link--secondary', () => {
    wrapper.setProps({
      modifier: 'secondary',
    });

    expect(wrapper.classes()).toContain('link--secondary');
    expect(wrapper.html()).toMatchSnapshot();
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
