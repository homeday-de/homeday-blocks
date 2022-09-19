import { wrapperFactoryBuilder } from 'tests/unit/helpers';
import HdNotifications from '@/components/notifications/HdNotifications.vue';
import HdNotification from '@/components/notifications/HdNotification.vue';
import TYPES from '@/components/notifications/HdNotificationsTypes';

const wrapperFactory = wrapperFactoryBuilder(HdNotifications);

describe('HdNotifications', () => {
  const build = (args) => {
    const wrapper = wrapperFactory({
      ...args,
      stubs: {
        HdIcon: true,
      },
    });

    return {
      wrapper,
      notification: () => wrapper.find(HdNotification),
    };
  };

  it('displays a notification', () => {
    const expectedClass = `notification--${TYPES.SUCCESS}`;
    const expectedMessage = 'Success message';

    const notifications = [{ id: 0, type: TYPES.SUCCESS, message: expectedMessage }];
    const props = { notifications };
    const { notification } = build({ props });

    expect(notification().exists()).toBe(true);
    expect(notification().classes()).toContain(expectedClass);
    expect(notification().text()).toContain(expectedMessage);
  });

  it('displays only the last notification', () => {
    const expectedClass = `notification--${TYPES.SUCCESS}`;
    const expectedMessage = 'Success message';

    const notifications = [
      { id: 0, type: TYPES.ERROR, message: 'An error ocurred' },
      { id: 1, type: TYPES.SUCCESS, message: expectedMessage },
    ];
    const props = { notifications };
    const { notification } = build({ props });

    expect(notification().exists()).toBe(true);
    expect(notification().classes()).toContain(expectedClass);
    expect(notification().text()).toContain(expectedMessage);
  });

  it('hides the component if there are no notification', () => {
    const props = { notifications: [] };
    const { notification } = build({ props });

    expect(notification().exists()).toBe(false);
  });

  it('renders a slot message', () => {
    const notifications = [
      {
        text: 'Welcome to',
        url: 'https://www.homeday.de',
        urlLabel: 'Homeday',
      },
    ];
    const { wrapper } = build({
      props: { notifications },
      scopedSlots: {
        default: `
          <p>
            {{ props.notification.text }}
            <a :href="props.notification.url">
              {{ props.notification.urlLabel }}
            </a>
          </p>
        `,
      },
    });

    const hyperlinkInSlot = wrapper.find('a');

    expect(wrapper.text()).toContain(notifications[0].text);
    expect(hyperlinkInSlot.exists()).toBe(true);
    expect(hyperlinkInSlot.attributes().href).toBe(notifications[0].url);
    expect(hyperlinkInSlot.text()).toBe(notifications[0].urlLabel);
  });
});
