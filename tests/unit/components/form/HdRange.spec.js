import {
  wrapperFactoryBuilder,
  getLastEventPayload,
} from 'tests/unit/helpers';
import HdRange from '@/components/form/HdRange.vue';

const TRACK_SELECTOR = '.range__track';
const PROGRESS_SELECTOR = '.range__progress';
const STEP_SELECTOR = '.range__step';
const TOOLTIP_SELECTOR = '.range__tooltip';
const LABEL_SELECTOR = '.range__step-label';

describe('HdRange', () => {
  let wrapper;
  const initialValue = 0;
  const max = 100;
  const min = -100;
  const step = 50;

  const wrapperFactory = wrapperFactoryBuilder(HdRange, {
    propsData: {
      name: 'testRange',
      min,
      max,
      step,
      value: initialValue,
      displayStepBullets: true,
    },
  });

  beforeEach(() => {
    wrapper = wrapperFactory();
  });

  test('renders as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders component with preselected value', () => {
    expect(parseFloat(wrapper.find('input').element.value)).toBe(initialValue);
  });

  test('limits the value to the passed `min` and `max`', () => {
    wrapper.setProps({
      value: max + 1,
    });

    expect(getLastEventPayload({ wrapper, eventName: 'input' })).toBe(max);

    wrapper.setProps({
      value: min - 1,
    });

    expect(getLastEventPayload({ wrapper, eventName: 'input' })).toBe(min);
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

  test('On props change, UI is updated', () => {
    const mockUpdateUI = jest.fn();
    wrapper.setMethods({ updateUI: mockUpdateUI });
    wrapper.setProps({
      min: min + 1,
    });

    expect(mockUpdateUI).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      max: max - 1,
    });

    expect(mockUpdateUI).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      step: 10,
    });

    expect(mockUpdateUI).toHaveBeenCalledTimes(3);
  });

  test('Step bullets are properly displayed', () => {
    expect(wrapper.findAll(STEP_SELECTOR).length).toBe(5);

    wrapper.setProps({
      displayStepBullets: false,
    });

    expect(wrapper.findAll(STEP_SELECTOR).length).toBe(0);
  });

  describe('Labels', () => {
    const TEST_LABELS = ['label1', 'label2', 'label3', 'label4'];
    const TEST_INDEX = Math.round(TEST_LABELS.length / 2);

    beforeEach(() => {
      wrapper = wrapperFactory({
        propsData: {
          displayStepBullets: true,
          labels: TEST_LABELS,
        },
      });
    });

    test('renders the right number of labels', () => {
      expect(wrapper.findAll(LABEL_SELECTOR).length).toBe(TEST_LABELS.length);
    });

    test('shows the right values', () => {
      expect(wrapper.findAll(LABEL_SELECTOR).at(TEST_INDEX).text()).toBe(TEST_LABELS[TEST_INDEX]);
    });
  });

  describe('Tooltip', () => {
    beforeEach(() => {
      wrapper = wrapperFactory({
        propsData: {
          displayTooltip: true,
        },
      });
    });

    test('is visible when the `displayTooltip` prop is set to `true`', () => {
      expect(wrapper.find(TOOLTIP_SELECTOR).exists()).toBe(true);

      wrapper.setProps({
        displayTooltip: false,
      });

      expect(wrapper.find(TOOLTIP_SELECTOR).exists()).toBe(false);
    });

    test('accepts custom value', () => {
      const TEST_TOOLTIP_VALUE = 'Foo Bar';

      wrapper.setProps({
        tooltipValue: TEST_TOOLTIP_VALUE,
      });

      expect(wrapper.find(TOOLTIP_SELECTOR).text()).toBe(TEST_TOOLTIP_VALUE);
    });

    test('shows the range value as a fallback', () => {
      const TEST_VALUE = 10;

      wrapper.setProps({
        displayTooltip: true,
        value: TEST_VALUE,
      });

      expect(wrapper.find(TOOLTIP_SELECTOR).text()).toBe(TEST_VALUE.toString());
    });
  });

  test('supports setting custom backgrounds', () => {
    const TEST_COLOR1 = 'red';
    const TEST_COLOR2 = 'blue';

    wrapper.setProps({
      trackBackground: TEST_COLOR1,
      progressBackground: TEST_COLOR2,
    });

    expect(wrapper.find(TRACK_SELECTOR).attributes().style).toMatch(`background: ${TEST_COLOR1}`);
    expect(wrapper.find(PROGRESS_SELECTOR).attributes().style).toMatch(`background: ${TEST_COLOR2}`);
  });
});
