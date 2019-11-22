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

  test('updates decoration at input event emit', () => {
    const mockedUpdateRangeDecoration = jest.fn();
    wrapper.setMethods({ updateRangeDecoration: mockedUpdateRangeDecoration });
    wrapper.find('input').trigger('input');

    expect(mockedUpdateRangeDecoration).toHaveBeenCalledTimes(1);
  });

  test('legacy browser flag on, it updates decoration at change event emit', () => {
    const mockedUpdateRangeDecoration = jest.fn();
    wrapper.setMethods({ updateRangeDecoration: mockedUpdateRangeDecoration });

    wrapper.setProps({
      isLegacy: true,
    });

    wrapper.find('input').trigger('change');

    expect(mockedUpdateRangeDecoration).toHaveBeenCalledTimes(1);
  });

  test('legacy browser flag off, it does not updates decoration at change event emit', () => {
    const mockedUpdateRangeDecoration = jest.fn();
    wrapper.setMethods({ updateRangeDecoration: mockedUpdateRangeDecoration });

    wrapper.setProps({
      isLegacy: false,
    });

    wrapper.find('input').trigger('change');

    expect(mockedUpdateRangeDecoration).toHaveBeenCalledTimes(0);
  });

  test('input focus emit is managed', () => {
    const mockedHandleFocus = jest.fn();
    wrapper.setMethods({ handleFocus: mockedHandleFocus });

    wrapper.find('input').trigger('focus');

    expect(mockedHandleFocus).toHaveBeenCalledTimes(1);
  });

  test('input blur emit is managed', () => {
    const mockedHandleBlur = jest.fn();
    wrapper.setMethods({ handleBlur: mockedHandleBlur });

    wrapper.find('input').trigger('blur');

    expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
  });
});
