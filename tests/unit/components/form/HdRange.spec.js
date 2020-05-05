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

const initialValue = 0;
const max = 100;
const min = -100;
const step = 50;

const wrapperBuilder = wrapperFactoryBuilder(HdRange, {
  props: {
    name: 'testRange',
    min,
    max,
    step,
    value: initialValue,
    displayStepBullets: true,
  },
});

describe('HdRange', () => {
  it('renders as expected', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders component with preselected value', () => {
    const wrapper = wrapperBuilder();

    expect(parseFloat(wrapper.find('input').element.value)).toBe(initialValue);
  });

  it('limits the value to the passed `min` and `max`', async () => {
    const wrapper = wrapperBuilder({
      props: {
        value: max + 1,
      },
    });

    expect(getLastEventPayload({ wrapper, eventName: 'input' })).toBe(max);

    wrapper.setProps({
      value: min - 1,
    });

    await wrapper.vm.$nextTick();

    expect(getLastEventPayload({ wrapper, eventName: 'input' })).toBe(min);
  });

  it('on input blur, the proper status is set and the proper method is executed', () => {
    const wrapper = wrapperBuilder();

    wrapper.get('input').trigger('focus');

    expect(wrapper.vm.isActive).toBe(true);
  });

  it('on input blur, the proper status is set and the proper method is executed', () => {
    const wrapper = wrapperBuilder({
      data: {
        isActive: true,
      },
    });

    wrapper.get('input').trigger('blur');

    expect(wrapper.vm.isActive).toBe(false);
  });

  it('on props change, UI is updated', async () => {
    const mockUpdateUI = jest.fn();
    const wrapper = wrapperBuilder({
      props: {
        min: min + 1,
      },
      methods: {
        updateUI: mockUpdateUI,
      },
    });

    expect(mockUpdateUI).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      max: max - 1,
    });

    await wrapper.vm.$nextTick();

    expect(mockUpdateUI).toHaveBeenCalledTimes(2);

    wrapper.setProps({
      step: 10,
    });

    await wrapper.vm.$nextTick();

    expect(mockUpdateUI).toHaveBeenCalledTimes(3);
  });

  it('step bullets are properly displayed', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.findAll(STEP_SELECTOR).length).toBe(5);

    wrapper.setProps({
      displayStepBullets: false,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(STEP_SELECTOR).length).toBe(0);
  });

  it('emits the right value on steps click', () => {
    const wrapper = wrapperBuilder();
    const steps = wrapper.findAll(STEP_SELECTOR);

    steps.at(0).trigger('click');
    expect(getLastEventPayload({ wrapper, eventName: 'input' })).toBe(min);

    steps.at(steps.length - 1).trigger('click');
    expect(getLastEventPayload({ wrapper, eventName: 'input' })).toBe(max);
  });

  describe('Labels', () => {
    const TEST_LABELS = ['label1', 'label<br>2', 'label3', 'label4'];
    const TEST_INDEX = Math.round(TEST_LABELS.length / 2);
    const labelsWrapperBuilder = wrapperFactoryBuilder(HdRange, {
      props: {
        name: 'testrange',
        min,
        max,
        step,
        value: initialValue,
        displayStepBullets: true,
        labels: TEST_LABELS,
      },
    });

    it('renders', () => {
      const wrapper = labelsWrapperBuilder();

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders the right number of labels', () => {
      const wrapper = labelsWrapperBuilder();

      expect(wrapper.findAll(LABEL_SELECTOR).length).toBe(TEST_LABELS.length);
    });

    it('shows the right values', () => {
      const wrapper = labelsWrapperBuilder();

      expect(wrapper.findAll(LABEL_SELECTOR).at(TEST_INDEX).text()).toBe(TEST_LABELS[TEST_INDEX]);
    });
  });

  describe('Tooltip', () => {
    const tooltipWrapperBuilder = wrapperFactoryBuilder(HdRange, {
      props: {
        name: 'testrange',
        min,
        max,
        step,
        value: initialValue,
        displayStepBullets: true,
        displayTooltip: true,
      },
    });

    it('is visible when the `displayTooltip` prop is set to `true`', async () => {
      const wrapper = tooltipWrapperBuilder();

      expect(wrapper.find(TOOLTIP_SELECTOR).exists()).toBe(true);

      wrapper.setProps({
        displayTooltip: false,
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find(TOOLTIP_SELECTOR).exists()).toBe(false);
    });

    it('accepts custom value', () => {
      const TEST_TOOLTIP_VALUE = 'Foo Bar';
      const wrapper = tooltipWrapperBuilder({
        props: {
          tooltipValue: TEST_TOOLTIP_VALUE,
        },
      });

      expect(wrapper.find(TOOLTIP_SELECTOR).text()).toBe(TEST_TOOLTIP_VALUE);
    });

    it('shows the range value as a fallback', () => {
      const TEST_VALUE = 10;
      const wrapper = tooltipWrapperBuilder({
        props: {
          displayTooltip: true,
          value: TEST_VALUE,
        },
      });

      expect(wrapper.find(TOOLTIP_SELECTOR).text()).toBe(TEST_VALUE.toString());
    });
  });

  it('supports setting custom backgrounds', () => {
    const TEST_COLOR1 = 'red';
    const TEST_COLOR2 = 'blue';
    const wrapper = wrapperBuilder({
      props: {
        trackBackground: TEST_COLOR1,
        progressBackground: TEST_COLOR2,
      },
    });

    expect(wrapper.find(TRACK_SELECTOR).attributes().style).toMatch(`background: ${TEST_COLOR1}`);
    expect(wrapper.find(PROGRESS_SELECTOR).attributes().style).toMatch(`background: ${TEST_COLOR2}`);
  });

  it('calls `updateUI` on resize', () => {
    const mockedUpdateUI = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        updateUI: mockedUpdateUI,
      },
    });

    wrapper.vm.onResize();

    expect(mockedUpdateUI).toHaveBeenCalledTimes(2);
  });
});
