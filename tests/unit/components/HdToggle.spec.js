import { shallowMount } from '@vue/test-utils';
import HdToggle from '@/components/HdToggle.vue';

const TOGGLE_BODY_SELECTOR = '.hd-toggle__body';
const TOGGLE_OPEN_SELECTOR = '.hd-toggle--is-open';
const TOGGLE_CONTROL_SELECTOR = '.hd-toggle__control';

const TEST_CONTENT = '<b>This is the HdToggle body.</b>';
const TEST_PROPS = {
  title: 'HdToggle',
  open: false,
};

describe('HdToggle', () => {
  let wrapper;
  let calculateBodyHeight;
  let ensureBodyScrolledToTop;
  let enableInternalFocus;
  let disableInternalFocus;

  beforeEach(() => {
    calculateBodyHeight = jest.fn();
    ensureBodyScrolledToTop = jest.fn();
    enableInternalFocus = jest.fn();
    disableInternalFocus = jest.fn();

    wrapper = shallowMount(HdToggle, {
      propsData: TEST_PROPS,
      slots: {
        default: TEST_CONTENT,
      },
      methods: {
        calculateBodyHeight,
        ensureBodyScrolledToTop,
        enableInternalFocus,
        disableInternalFocus,
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the title', () => {
    expect(wrapper.find(TOGGLE_CONTROL_SELECTOR).text()).toBe(TEST_PROPS.title);
  });

  it('renders the slot', () => {
    expect(wrapper.find(TOGGLE_BODY_SELECTOR).element.innerHTML).toBe(TEST_CONTENT);
  });

  it('toggles the body with title click ', () => {
    const toggleControl = wrapper.find(TOGGLE_CONTROL_SELECTOR);

    toggleControl.trigger('click');

    expect(wrapper.emitted('toggle')).toBeTruthy();
  });

  it('toggles the body with the prop `open` true/false', () => {
    expect(wrapper.find(TOGGLE_OPEN_SELECTOR).exists()).toBeFalsy();

    wrapper.setProps({ open: true });

    expect(wrapper.find(TOGGLE_OPEN_SELECTOR).exists()).toBeTruthy();
  });

  it('emits `toggle` event when toggled', () => {
    wrapper.vm.toggleOpen();

    expect(wrapper.emitted().toggle).toBeTruthy();
  });

  it('won\'t toggle if the prop `canBeToggled` is set to false', () => {
    wrapper.setProps({ canBeToggled: false });

    const toggleControl = wrapper.find(TOGGLE_CONTROL_SELECTOR);

    toggleControl.trigger('click');

    expect(wrapper.emitted('toggle')).toBeFalsy();
  });

  it('calculates its body height after mount', () => {
    expect(calculateBodyHeight).toBeCalled();
  });

  it('ensures the body is scrolled to top when toggled', () => {
    wrapper.setProps({ open: true });

    expect(ensureBodyScrolledToTop).toBeCalled();
  });

  it('enables/disables internal focus when toggled/untoggled', async () => {
    await wrapper.setProps({ open: true });

    expect(enableInternalFocus).toBeCalled();

    await wrapper.setProps({ open: false });

    expect(disableInternalFocus).toBeCalled();
  });
});
