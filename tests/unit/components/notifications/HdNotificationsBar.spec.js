import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdNotificationsBar from '@/components/notifications/HdNotificationsBar.vue';

const MESSAGE = 'Hello world!';
const SLOT = '<p>Hello world!, <a href="#">This is a link...</a></p>';
const CONTENT_SELECTOR = '.notifications-bar__content';
const ICON_FAKE_PATH = '/foo/bar/icon.svg';

const VISIBLE_CLASS = 'notifications-bar--visible';

const wrapperBuilder = wrapperFactoryBuilder(HdNotificationsBar, {
  shallow: true,
});

describe('HdNotificationsBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = wrapperBuilder({
      props: {
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
    wrapper = wrapperBuilder({
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

  it('supports hiding the bar', async () => {
    expect(wrapper.classes().includes(VISIBLE_CLASS)).toBe(true);

    wrapper.setProps({
      visible: false,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes().includes(VISIBLE_CLASS)).toBe(false);
  });
});
