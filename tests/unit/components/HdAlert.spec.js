import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdAlert from '@/components/HdAlert.vue';
import { TYPES } from '@/components/HdAlertTypes';

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

  Object.keys(TYPES).forEach((type) => {
    it(`should render alert--${type}`, () => {
      const wrapper = wrapperBuilder({
        props: {
          type,
        },
      });

      expect(wrapper.classes()).toContain(`alert--${type}`);
      expect(wrapper.html()).toMatchSnapshot();
    });
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
