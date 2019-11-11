import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdRange from '@/components/form/HdRange.vue';

describe('HdRange', () => {
  let wrapper;
  const initialValue = 25;
  const maxValue = 100;
  const minValue = 0;
  const wrapperFactory = wrapperFactoryBuilder(HdRange, {
    propsData: {
      name: 'testRange',
      minValue,
      maxValue,
      value: initialValue,
    },
  });

  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders with preselected value', () => {
    console.error(wrapper.find('input'));
    expect(parseFloat(wrapper.find('input').element.value)).toBe(initialValue);
  });

  test('manages the max value', () => {
    wrapper.setProps({
      value: maxValue * 2,
    });

    expect(parseFloat(wrapper.find('input').element.value)).toBe(maxValue);
    expect(wrapper.emitted('input')[1][0]).toEqual(maxValue);
  });

  test('menages the min value', () => {
    wrapper.setProps({
      value: minValue - 100,
    });

    expect(parseFloat(wrapper.find('input').element.value)).toBe(minValue);
    expect(wrapper.emitted('input')[1][0]).toEqual(minValue);
  });
});
