import { shallowMount } from '@vue/test-utils';
import HdTooltip from '@/components/tooltip/HdTooltip.vue';

describe('HdTooltip', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdTooltip);
  });

  test('the component is rendered', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('the window tooltip element is set properly', () => {
    expect(window.tooltipElement).toEqual(wrapper.element);
  });
});
