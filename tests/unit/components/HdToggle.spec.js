import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdToggle from '@/components/HdToggle.vue';

const TOGGLE_BODY_SELECTOR = '.hd-toggle__body';
const TOGGLE_OPEN_SELECTOR = '.hd-toggle--is-open';
const TOGGLE_CONTROL_SELECTOR = '.hd-toggle__control';
const ACTIONS_MENU_ITEM_SELECTOR = '.hd-toggle__control-actions-menu-item';

const TEST_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><circle cx="12" cy="6" r="2" fill="#1C3553"/><circle cx="12" cy="12" r="2" fill="#1C3553"/><circle cx="12" cy="18" r="2" fill="#1C3553"/></svg>';
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

  it('renders actions menu when provided props', async () => {
    const wrapper = wrapperBuilder();

    const actions = [
      {
        name: 'delete',
        label: 'Delete',
        icon: TEST_SVG,
      },
      {
        name: 'edit',
        label: 'Edit',
        icon: TEST_SVG,
      },
    ];

    await wrapper.setProps({ actions });

    const actionMenuItems = wrapper.findAll(ACTIONS_MENU_ITEM_SELECTOR);

    expect(actionMenuItems.length).toBe(actions.length);

    actionMenuItems.at(0).trigger('click');
    actionMenuItems.at(1).trigger('click');

    expect(wrapper.emitted()).toEqual({
      [actions.at(0).name]: [[]],
      [actions.at(1).name]: [[]],
    });
  });

  it("won't toggle if the prop `canBeToggled` is set to false", async () => {
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
