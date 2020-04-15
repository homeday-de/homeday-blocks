import { wrapperFactoryBuilder } from 'tests/unit/helpers';
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

const wrapperBuilder = wrapperFactoryBuilder(HdToggle, {
  props: { ...TEST_PROPS },
  slots: {
    default: TEST_CONTENT,
  },
  shallow: true,
});

describe('HdToggle', () => {
  it('renders the component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the title', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(TOGGLE_CONTROL_SELECTOR).text()).toBe(TEST_PROPS.title);
  });

  it('renders the slot', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(TOGGLE_BODY_SELECTOR).element.innerHTML).toBe(TEST_CONTENT);
  });

  it('toggles the body with the prop `open` true/false', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(TOGGLE_OPEN_SELECTOR).exists()).toBeFalsy();

    wrapper.setProps({ open: true });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(TOGGLE_OPEN_SELECTOR).exists()).toBeTruthy();
  });

  it('emits `toggle` event when toggled', () => {
    const wrapper = wrapperBuilder();

    wrapper.vm.toggleOpen();

    expect(wrapper.emitted().toggle).toBeTruthy();
  });

  it('won\'t toggle if the prop `canBeToggled` is set to false', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(TOGGLE_CONTROL_SELECTOR).attributes().disabled).toBeFalsy();

    wrapper.setProps({ canBeToggled: false });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(TOGGLE_CONTROL_SELECTOR).attributes().disabled).toBeTruthy();
  });

  it('calculates its body height after mount', async () => {
    const getScrollHeight = jest.fn(() => FAKE_HEIGHT);
    const wrapper = wrapperBuilder({
      methods: {
        getScrollHeight,
      },
    });

    await wrapper.vm.$nextTick();

    expect(getScrollHeight).toBeCalled();

    expect(wrapper.vm.bodyHeight).toEqual(FAKE_HEIGHT);
  });

  it('ensures the body is scrolled to top when toggled', () => {
    const wrapper = wrapperBuilder({
      props: {
        open: true,
      },
    });

    expect(wrapper.vm.$refs.body.scrollTop).toEqual(0);
  });

  it('removes resize events before it get destroyed', () => {
    const removeResizeEvents = jest.fn();
    const wrapper = wrapperBuilder({
      methods: {
        removeResizeEvents,
      },
    });

    wrapper.destroy();

    expect(removeResizeEvents).toBeCalled();
  });
});
