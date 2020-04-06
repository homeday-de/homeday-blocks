import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdAlert from '@/components/HdAlert.vue';

const defaultSlot = '<b>Default slot</b>';

const wrapperBuilder = wrapperFactoryBuilder(HdAlert, {
  slots: {
    default: defaultSlot,
  },
  shallow: true,
});

const MESSAGE_SELECTOR = '.alert__message';
const ICON_SELECTOR = '.alert__icon';

describe('HdAlert', () => {
  it('renders component', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders the slot correctly', () => {
    const wrapper = wrapperBuilder();

    expect(wrapper.find(MESSAGE_SELECTOR).element.innerHTML).toBe(defaultSlot);
  });

  it('renders the right type', () => {
    const TEST_TYPE = 'warning';
    const wrapper = wrapperBuilder({
      props: {
        type: TEST_TYPE,
      },
    });
    // It doesn't make sense to go through all the possible types (we may have many)
    // they share the same logic, so if one works the rest should work as well

    expect(wrapper.classes()).toContain(`alert--${TEST_TYPE}`);
  });

  it('renders a custom icon', () => {
    const ICON_URL = 'https://placeholder.pics/svg/24x24';
    const wrapper = wrapperBuilder({
      props: {
        icon: ICON_URL,
      },
    });

    expect(wrapper.find(ICON_SELECTOR).attributes().src).toBe(ICON_URL);
  });

  it('doesn\'t render an icon if the prop `no-icon` is true', () => {
    const wrapper = wrapperBuilder({
      props: {
        noIcon: true,
      },
    });

    expect(wrapper.find(ICON_SELECTOR).exists()).toBe(false);
  });
});
