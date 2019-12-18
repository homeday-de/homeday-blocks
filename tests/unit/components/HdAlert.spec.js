import { shallowMount } from '@vue/test-utils';
import HdAlert from '@/components/HdAlert.vue';

const MESSAGE_SELECTOR = '.alert__message';
const ICON_SELECTOR = '.alert__icon';

const CONTENT = '<b>Default slot</b>';

describe('HdAlert', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HdAlert, {
      slots: {
        default: CONTENT,
      },
    });
  });

  test('renders component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders the slot correctly', () => {
    expect(wrapper.find(MESSAGE_SELECTOR).element.innerHTML).toBe(CONTENT);
  });

  test('renders the right type', async () => {
    // It doesn't make sense to go through all the possible types (we may have many)
    // they share the same logic, so if one works the rest should work as well
    const TEST_TYPE = 'warning';

    wrapper.setProps({
      type: TEST_TYPE,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain(`alert--${TEST_TYPE}`);
  });

  test('renders a custom icon', async () => {
    const ICON_URL = 'https://placeholder.pics/svg/24x24';
    wrapper.setProps({
      icon: ICON_URL,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ICON_SELECTOR).attributes().src).toBe(ICON_URL);
  });

  test('doesn\'t render an icon if the prop `no-icon` is true', async () => {
    wrapper.setProps({
      noIcon: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);
  });
});
