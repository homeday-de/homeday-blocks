import { mount } from '@vue/test-utils';
import HdNotificationsBar from '@/components/notifications/HdNotificationsBar.vue';

const MESSAGE = 'Hello world!, <a href="/test">This is a link...</a>';
const MESSAGE_SELECTOR = '.notifications-bar__message';
const ICON_SELECTOR = '.notifications-bar__icon__image';
const ICON_FAKE_PATH = '/foo/bar/icon.svg';

describe('HdNotificationsBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdNotificationsBar, {
      propsData: {
        message: MESSAGE,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders a message correctly', () => {
    expect(wrapper.find(MESSAGE_SELECTOR).element.innerHTML).toBe(MESSAGE);
  });

  test('supports custom icon', () => {
    wrapper.setProps({ customIcon: ICON_FAKE_PATH });
    expect(wrapper.find(ICON_SELECTOR).attributes().src).toBe(ICON_FAKE_PATH);
  });

  test('supports setting a custom offset', () => {
    wrapper.setProps({
      offsetTop: 20,
      offsetRight: 30,
      offsetLeft: 40,
    });
    expect(wrapper.vm.$el.style.top).toBe('20px');
    expect(wrapper.vm.$el.style.right).toBe('30px');
    expect(wrapper.vm.$el.style.left).toBe('40px');
  });

  test('supports hiding the bar', () => {
    expect(wrapper.classes().includes('isVisible')).toBe(true);
    wrapper.setProps({
      visible: false,
    });
    expect(wrapper.classes().includes('isVisible')).toBe(false);
  });
});
