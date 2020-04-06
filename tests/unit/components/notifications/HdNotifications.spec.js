import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdNotifications from '@/components/notifications/HdNotifications.vue';

const NOTIFICATIONS = [
  {
    message: 'Hello <a href="http://localhost">Homeday!</a>',
  },
];

const wrapperBuilder = wrapperFactoryBuilder(HdNotifications, {
  props: {
    notifications: [],
  },
  shallow: true,
});

describe('HdNotifications', () => {
  let scrollHeightSpy = jest.fn();

  afterEach(() => {
    scrollHeightSpy.mockRestore();
  });

  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders notification bars', () => {
    const wrapper = wrapperBuilder({
      props: {
        notifications: NOTIFICATIONS,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('fires the heightChange event when height of the notifications changes', async () => {
    const wrapper = wrapperBuilder();

    scrollHeightSpy = jest.spyOn(wrapper.vm, 'getScrollHeight')
      .mockImplementation(
        // A random number, used just to make sure it's not 0 and that the height
        // actually changes
        () => 123,
      );

    wrapper.setProps({ notifications: NOTIFICATIONS });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('heightChange')).toBeTruthy();
  });
});
