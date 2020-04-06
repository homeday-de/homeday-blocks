import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdNotificationsBar from '@/components/notifications/HdNotificationsBar.vue';

const MESSAGE = 'Hello world!, <a href="/test">This is a link...</a>';
const ICON_FAKE_PATH = '/foo/bar/icon.svg';

const wrapperBuilder = wrapperFactoryBuilder(HdNotificationsBar, {
  props: {
    message: MESSAGE,
  },
});

describe('HdNotificationsBar', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('supports custom icon', () => {
    const wrapper = wrapperBuilder({
      props: {
        customIcon: ICON_FAKE_PATH,
      },
    });

    expect(wrapper.vm.icon).toBe(ICON_FAKE_PATH);
  });

  it('supports setting a custom offset', () => {
    const wrapper = wrapperBuilder({
      props: {
        offsetTop: 20,
        offsetRight: 30,
        offsetLeft: 40,
      },
    });

    expect(wrapper.vm.$el.style.top).toBe('20px');
    expect(wrapper.vm.$el.style.right).toBe('30px');
    expect(wrapper.vm.$el.style.left).toBe('40px');
  });

  it('supports hiding the bar', async () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.classes().includes('isVisible')).toBe(true);

    wrapper.setProps({
      visible: false,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes().includes('isVisible')).toBe(false);
  });
});
