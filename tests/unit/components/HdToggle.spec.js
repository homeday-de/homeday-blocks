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
const FAKE_HEIGHT = 300;

describe('HdToggle', () => {
  let wrapper;
  let getScrollHeight;
  let removeResizeEvents;

  beforeEach(() => {
    getScrollHeight = jest.fn(() => FAKE_HEIGHT);
    removeResizeEvents = jest.fn();

    wrapper = shallowMount(HdToggle, {
      propsData: TEST_PROPS,
      slots: {
        default: TEST_CONTENT,
      },
      methods: {
        getScrollHeight,
        removeResizeEvents,
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
    expect(wrapper.find(TOGGLE_CONTROL_SELECTOR).attributes().disabled).toBeFalsy();

    wrapper.setProps({ canBeToggled: false });

    expect(wrapper.find(TOGGLE_CONTROL_SELECTOR).attributes().disabled).toBeTruthy();
  });

  it('calculates its body height after mount', () => {
    expect(getScrollHeight).toBeCalled();

    expect(wrapper.vm.bodyHeight).toEqual(FAKE_HEIGHT);
  });

  it('ensures the body is scrolled to top when toggled', () => {
    wrapper.setProps({ open: true });

    expect(wrapper.vm.$refs.body.scrollTop).toEqual(0);
  });

  it('removes resize events before it get destroyed', () => {
    wrapper.destroy();

    expect(removeResizeEvents).toBeCalled();
  });
});
