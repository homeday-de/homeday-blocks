import { mount } from '@vue/test-utils';
import HdTooltip from '@/components/tooltip/HdTooltip.vue';

describe('HdTooltip', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdTooltip);
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders a span', () => {
    const span = wrapper.find('span');

    expect(span.exists()).toBe(true);
  });
});
