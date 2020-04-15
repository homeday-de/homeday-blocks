import { shallowMount } from '@vue/test-utils';
import HdNotificationsBar from '@/components/notifications/HdNotificationsBar.vue';

const MESSAGE = 'Hello world!';
const SLOT = '<p>Hello world!, <a href="#">This is a link...</a></p>';
const CONTENT_SELECTOR = '.notifications-bar__content';
const ICON_FAKE_PATH = '/foo/bar/icon.svg';

const COMPACT_CLASS = 'notifications-bar--compact';
const VISIBLE_CLASS = 'notifications-bar--visible';

describe('HdNotificationsBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdNotificationsBar, {
      propsData: {
        message: MESSAGE,
      },
    });
  });


  it('renders as expected', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders a message correctly', () => {
    expect(wrapper.find(CONTENT_SELECTOR).text()).toBe(MESSAGE);
  });

  it('renders a slot correctly', () => {
    wrapper = shallowMount(HdNotificationsBar, {
      slots: {
        default: SLOT,
      },
    });

    expect(wrapper.find(CONTENT_SELECTOR).element.innerHTML).toBe(SLOT);
  });

  it('supports custom icon', () => {
    wrapper.setProps({ customIcon: ICON_FAKE_PATH });
    expect(wrapper.vm.icon).toBe(ICON_FAKE_PATH);
  });

  it('can be compact', async () => {
    expect(wrapper.classes().includes(COMPACT_CLASS)).toBe(false);

    wrapper.setProps({
      compact: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes().includes(COMPACT_CLASS)).toBe(true);
  });

  it('supports hiding the bar', async () => {
    expect(wrapper.classes().includes(VISIBLE_CLASS)).toBe(true);

    wrapper.setProps({
      visible: false,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes().includes(VISIBLE_CLASS)).toBe(false);
  });
});
