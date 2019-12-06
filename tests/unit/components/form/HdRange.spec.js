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

  test('respects the maximum value passed', () => {
    wrapper.setProps({
      value: maxValue * 2,
    });

    expect(parseFloat(wrapper.find('input').element.value)).toBe(maxValue);
    expect(wrapper.emitted('input')[1][0]).toEqual(maxValue);
  });

  test('limits the value to the passed minimum value', () => {
    wrapper.setProps({
      value: minValue - 100,
    });

    expect(parseFloat(wrapper.find('input').element.value)).toBe(minValue);
    expect(wrapper.emitted('input')[1][0]).toEqual(minValue);
  });

  test('When the focus event is emitted, the proper method is executed', () => {
    const mockedFocusHandler = jest.fn();
    wrapper.setMethods({ focusHandler: mockedFocusHandler });

    wrapper.find('input').trigger('focus');

    expect(mockedFocusHandler).toHaveBeenCalledTimes(1);
  });

  test('When the focus event is emitted, the input is in an active status', () => {
    wrapper.find('input').trigger('focus');

    expect(wrapper.vm.isActive).toBe(true);
  });

  test('When the blur event is emitted, the proper method is executed', () => {
    const mockedBlurHandler = jest.fn();
    wrapper.setMethods({ blurHandler: mockedBlurHandler });

    wrapper.find('input').trigger('blur');

    expect(mockedBlurHandler).toHaveBeenCalledTimes(1);
  });

  test('When the blue event is emitted, the input is in an non active status', () => {
    wrapper.find('input').trigger('blur');

    expect(wrapper.vm.isActive).toBe(false);
  });

  test('On props change, decoration is updated', () => {
    const mockUpdateRangeDecoration = jest.fn();
    wrapper.setMethods({ updateRangeDecoration: mockUpdateRangeDecoration });
    wrapper.setProps({
      minValue: minValue - 1,
    });

    expect(mockUpdateRangeDecoration).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      maxValue: maxValue + 1,
    });

    expect(mockUpdateRangeDecoration).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      rangeStep: 14,
    });

    expect(mockUpdateRangeDecoration).toHaveBeenCalledTimes(3);
  });
});
