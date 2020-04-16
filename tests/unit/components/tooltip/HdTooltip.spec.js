import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdTooltip from '@/components/tooltip/HdTooltip.vue';

const wrapperBuilder = wrapperFactoryBuilder(HdTooltip);

describe('HdTooltip', () => {
  it('the component is rendered', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('the window tooltip element is set properly', () => {
    const wrapper = wrapperBuilder();

    expect(window.tooltipElement).toEqual(wrapper.element);
  });
});
