import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import {
  error as errorIcon,
  bell as bellIcon,
  info as infoIcon,
  checkCircle as checkCircleIcon,
} from 'homeday-assets';
import HdIcon from 'homeday-blocks/src/components/HdIcon.vue';
import HdNotification from '@/components/notifications/HdNotification.vue';
import TYPES from 'homeday-blocks/src/components/notifications/HdNotificationsTypes';

jest.mock('homeday-assets', () => ({
  error: 'error.svg',
  bell: 'bell.svg',
  info: 'info.svg',
  checkCircle: 'checkCircle.svg',
}));

const ICONS_LOOKUP_TABLE = {
  [TYPES.ERROR]: errorIcon,
  [TYPES.NOTIFICATION]: bellIcon,
  [TYPES.INFO]: infoIcon,
  [TYPES.SUCCESS]: checkCircleIcon,
};

const wrapperFactory = wrapperFactoryBuilder(HdNotification);

describe('HdNotification', () => {
  const build = (args) => {
    const wrapper = wrapperFactory({
      ...args,
      stubs: {
        HdIcon: true,
      },
    });

    return {
      wrapper,
      icon: () => wrapper.find(HdIcon),
      content: () => wrapper.find('.notification__content'),
    };
  };

  it('renders the component', () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders all notifications types', () => {
    Object.values(TYPES).forEach((type) => {
      const expectedMessage = `Notification type: "${type}"`;
      const expectedIcon = ICONS_LOOKUP_TABLE[type];
      const expectedTypeClass = `notification--${type}`;

      const props = { message: expectedMessage, type };
      const { wrapper, icon, content } = build({ props });

      expect(icon().attributes().src).toEqual(expectedIcon);
      expect(content().text()).toContain(expectedMessage);
      expect(wrapper.classes()).toContain(expectedTypeClass);
    });
  });

  it('renders a slot message', () => {
    const expectedSlot = '<p>Hello world!, <a href="#">This is a link...</a></p>';
    const { content } = build({
      slots: {
        default: expectedSlot,
      },
    });

    expect(content().html()).toContain(expectedSlot);
  });

  it('centers content', async () => {
    const expectedClass = 'notification__content--centered';
    const { wrapper, content } = build();

    expect(content().classes()).not.toContain(expectedClass);

    wrapper.setProps({
      centered: true,
    });
    await wrapper.vm.$nextTick();

    expect(content().classes()).toContain(expectedClass);
  });
});
