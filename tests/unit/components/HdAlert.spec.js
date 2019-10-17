import { mount } from '@vue/test-utils';
import HdAlert from '@/components/HdAlert.vue';

const MESSAGE_SELECTOR = '.alert__message';
const ICON_SELECTOR = '.alert__icon';

describe('HdAlert', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HdAlert, {
      propsData: {
        message: 'message test',
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders a message correctly', () => {
    const MESSAGE = 'An html <u><b><i>styled</i></b></u> message';
    wrapper.setProps({
      message: MESSAGE,
    });

    expect(wrapper.find(MESSAGE_SELECTOR).element.innerHTML).toBe(MESSAGE);
  });

  test('renders the right type', () => {
    // It doesn't make sense to go through all the possible types (we may have many)
    // they share the same logic, so if one works the rest should work as well
    const TEST_TYPE = 'warning';

    wrapper.setProps({
      type: TEST_TYPE,
    });

    expect(wrapper.classes()).toContain(`alert--${TEST_TYPE}`);
  });

  test('renders a custom icon', () => {
    const ICON_URL = 'https://placeholder.pics/svg/24x24';
    wrapper.setProps({
      icon: ICON_URL,
      noIcon: false,
    });

    expect(wrapper.find(ICON_SELECTOR).attributes().src).toBe(ICON_URL);
  });

  test('doesn\'t render an icon if the prop `no-icon` is true', () => {
    wrapper.setProps({
      noIcon: true,
    });

    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);
  });
});
