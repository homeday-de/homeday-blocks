import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdLoaderButton, { LOADING_STATE } from '@/components/buttons/HdLoaderButton.vue';

// FIXME: JSDOM API issue.
// querySelectorAll('paths') returns SVGElement instead of the DOM API SVGPathElement
SVGElement.prototype.getTotalLength = () => 42;

const BASE_CLASS = 'loaderButton';
const BUTTON_SELECTOR = `.${BASE_CLASS}__button`;
const LABEL_SELECTOR = `.${BASE_CLASS}__button__label`;
const TEST_LABEL = 'HdLoaderButton';

const wrapperBuilder = wrapperFactoryBuilder(HdLoaderButton, {
  props: {
    label: TEST_LABEL,
  },
});

describe('HdLoaderButton', () => {
  it('renders', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('presents the label', () => {
    const wrapper = wrapperBuilder();
    const labelContainer = wrapper.get(LABEL_SELECTOR);

    expect(labelContainer.exists()).toBeTruthy();
    expect(labelContainer.text()).toEqual(TEST_LABEL);
  });

  it('calls `clicked` method on click', () => {
    const clicked = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        clicked,
      },
    });

    wrapper.find(BUTTON_SELECTOR).trigger('click');

    expect(clicked).toHaveBeenCalled();
  });

  it('adapts its classes according to its state', async () => {
    jest.useFakeTimers();

    const wrapper = wrapperBuilder();

    // initially it should be idle
    expect(wrapper.vm.state).toEqual(LOADING_STATE.IDLE);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.IDLE}`);

    // after it start loading it should be loading
    wrapper.vm.startLoading();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.state).toEqual('loading');
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.LOADING}`);

    // on success it should be success
    wrapper.vm.setSuccessState();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.state).toEqual(LOADING_STATE.SUCCESS);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.SUCCESS}`);

    // on error it should be error
    wrapper.vm.setErrorState();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.state).toEqual(LOADING_STATE.ERROR);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.ERROR}`);

    // at the end it should be back to idle if `resetOnSuccess` isn't set to false
    wrapper.vm.setIdleState();
    jest.runOnlyPendingTimers();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.state).toEqual(LOADING_STATE.IDLE);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.IDLE}`);
  });

  it('should emit click when disabled', () => {
    const clicked = jest.fn();
    const wrapper = wrapperBuilder({
      props: {
        disabled: true,
      },
      methods: {
        clicked,
      },
    });
    const button = wrapper.get(BUTTON_SELECTOR);

    expect(button.attributes().disabled).toBeFalsy();

    button.trigger('click');

    expect(clicked).toHaveBeenCalled();
  });

  it('should toggle disabled class', async () => {
    // Enabled
    const disabledClass = 'btn--primary-disabled';
    const wrapper = wrapperBuilder({
      props: {
        disabled: false,
      },
    });
    const button = wrapper.get(BUTTON_SELECTOR);
    expect(button.attributes().class).not.toContain(disabledClass);

    // Disabled
    wrapper.setProps({
      disabled: true,
    });
    await wrapper.vm.$nextTick();
    expect(button.attributes().class).toContain(disabledClass);
  });
});
