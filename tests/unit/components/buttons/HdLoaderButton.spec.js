import { shallowMount } from '@vue/test-utils';
import HdLoaderButton, { LOADING_STATE } from '@/components/buttons/HdLoaderButton.vue';

// FIXME: JSDOM API issue.
// querySelectorAll('paths') returns SVGElement instead of the DOM API SVGPathElement
SVGElement.prototype.getTotalLength = () => 42;

const BASE_CLASS = 'loaderButton';
const BUTTON_SELECTOR = `.${BASE_CLASS}__button`;
const LABEL_SELECTOR = `.${BASE_CLASS}__button__label`;

const TEST_LABEL = 'HdLoaderButton';

describe('HdLoaderButton', () => {
  let wrapper;
  const clicked = jest.fn();

  beforeEach(() => {
    wrapper = shallowMount(HdLoaderButton, {
      propsData: {
        label: TEST_LABEL,
      },
      methods: {
        clicked,
      },
    });
  });

  it('renders', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('presents the label', () => {
    const labelContainer = wrapper.find(LABEL_SELECTOR);
    expect(labelContainer.exists()).toBeTruthy();
    expect(labelContainer.text()).toEqual(TEST_LABEL);
  });

  it('calls `clicked` method on click', () => {
    wrapper.find(BUTTON_SELECTOR).trigger('click');

    expect(clicked).toHaveBeenCalled();
  });

  it('adapts its classes according to its state', () => {
    jest.useFakeTimers();

    // initially it should be idle
    expect(wrapper.vm.state).toEqual(LOADING_STATE.IDLE);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.IDLE}`);

    // after it start loading it should be loading
    wrapper.vm.startLoading();
    expect(wrapper.vm.state).toEqual('loading');
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.LOADING}`);

    // on success it should be success
    wrapper.vm.setSuccessState();
    expect(wrapper.vm.state).toEqual(LOADING_STATE.SUCCESS);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.SUCCESS}`);

    // on error it should be error
    wrapper.vm.setErrorState();
    expect(wrapper.vm.state).toEqual(LOADING_STATE.ERROR);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.ERROR}`);

    // at the end it should be back to idle if `resetOnSuccess` isn't set to false
    wrapper.vm.setIdleState();
    jest.runOnlyPendingTimers();
    expect(wrapper.vm.state).toEqual(LOADING_STATE.IDLE);
    expect(wrapper.classes()).toContain(`${BASE_CLASS}--${LOADING_STATE.IDLE}`);
  });

  it('should emit click when disabled', () => {
    const button = wrapper.find(BUTTON_SELECTOR);

    wrapper.setProps({ disabled: true });

    expect(button.attributes().disabled).toBeFalsy();

    button.trigger('click');

    expect(clicked).toHaveBeenCalled();
  });
});
