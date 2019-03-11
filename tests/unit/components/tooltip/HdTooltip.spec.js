<<<<<<< HEAD
import { mount } from '@vue/test-utils';
=======
import { shallowMount } from '@vue/test-utils';
>>>>>>> :white_check_mark: HDTooltip tests
import HdTooltip from '@/components/tooltip/HdTooltip.vue';

describe('HdTooltip', () => {
  let wrapper;

  beforeEach(() => {
<<<<<<< HEAD
    wrapper = mount(HdTooltip);
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders a span', () => {
    const span = wrapper.find('span');

    expect(span.exists()).toBe(true);
=======
    wrapper = shallowMount(HdTooltip);
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('the window tooltip element is set properly', () => {
    expect(window.tooltipElement).toEqual(wrapper.element);
>>>>>>> :white_check_mark: HDTooltip tests
  });
});
