import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdRange from '@/components/form/HdRange.vue';

describe('HdRange', () => {
  let wrapper;
  const initialValue = 25;
  const maxValue = 100;
  const minValue = -100;
  const rangeStep = 10;
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

  test('renders component with preselected value', () => {
    expect(wrapper.html()).toMatchSnapshot();
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

  test('When the focus event is emitted, the proper status is set and the proper method is executed', () => {
    wrapper.find('input').trigger('focus');

    expect(wrapper.vm.isActive).toBe(true);

    const mockedFocusHandler = jest.fn();
    wrapper.setMethods({ focusHandler: mockedFocusHandler });
    wrapper.find('input').trigger('focus');

    expect(mockedFocusHandler).toHaveBeenCalledTimes(1);
  });

  test('When the blur event is emitted, the proper status is set and the proper method is executed', () => {
    wrapper.find('input').trigger('blur');

    expect(wrapper.vm.isActive).toBe(false);

    const mockedBlurHandler = jest.fn();
    wrapper.setMethods({ blurHandler: mockedBlurHandler });
    wrapper.find('input').trigger('blur');

    expect(mockedBlurHandler).toHaveBeenCalledTimes(1);
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

  test('Step bullets are properly displayed', () => {
    wrapper.setProps({
      rangeStep,
    });
    let foundStepsCount = wrapper.findAll('.range__steps li').length;

    expect(foundStepsCount).toBe(21);

    wrapper.setProps({
      displayStepBullets: false,
    });

    foundStepsCount = wrapper.findAll('.range__steps li').length;
    expect(foundStepsCount).toBe(0);
  });
});
