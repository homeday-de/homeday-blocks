import {
  HdNotifications,
  HdNotification,
  HdNotificationsTypes as TYPES,
  HdButton,
} from 'homeday-blocks';

export default {
  title: 'Components/Notifications/HdNotifications',
  component: HdNotifications,
  subcomponents: { HdNotification },
  argTypes: {
    notifications: {
      control: { type: 'object' },
    },
  },
  args: {
    notifications: [
      {
        id: 0,
        type: TYPES.NOTIFICATION,
        message: 'My notification.',
        closable: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: "Use Notifications at the top of your application's screen to display critical messages about the loss of data, features, notes, prompts, or important information that could affect the user's ability to use the product.",
      },
      source: {
        code: `
const notifications = [
  { id: 0, type: 'success', message: 'Success message' },
  { id: 1, type: 'error', message: 'Error message' },
  { id: 2, type: 'notification', message: 'Notification message' },
]

<HdNotifications
  :notifications="notifications"
/>
        `,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdNotifications },
  template: `
    <HdNotifications
      :notifications="notifications"
    />
  `,
});

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdNotifications, HdButton },
  template: `
    <div>
      <HdNotifications
        :notifications="notifications"
      />

      <div style="display: flex; flex-wrap: wrap; align-items: center; margin-top: 20px;">
        <hd-button modifier="secondary" @click="removeNotification" style="margin-bottom: 5px;">
          Remove current notification
        </hd-button>
        <hd-button
          v-for="type in types"
          :key="type"
          modifier="flat"
          @click="addNotification(type)"
          style="margin: 5px 0;"
        >
          Add "{{ type }}"
        </hd-button>
      </div>
    </div>
  `,
  computed: {
    types() {
      return Object.values(TYPES);
    },
  },
  methods: {
    removeNotification() {
      this.notifications.pop();
    },
    addNotification(type) {
      const id = this.notifications.length + 1;
      this.notifications.push({
        id,
        type,
        message: `Notification ${id}: Our Homeday brokers come from your region and have known the local real estate market for many years.`,
      });
    },
  },
});

export const Error = Template.bind({});
Error.args = {
  notifications: [
    {
      id: 0,
      type: TYPES.ERROR,
      message: 'ERROR notification.',
    },
  ],
};
Error.parameters = {
  docs: {
    source: {
      code: `
const notifications = [
  { id: 0, type: 'error', message: 'Hello' }
]

<HdNotifications
  :notifications="notifications"
/>
      `,
    },
  },
};

export const Notification = Template.bind({});
Notification.args = {
  notifications: [
    {
      id: 0,
      type: TYPES.NOTIFICATION,
      message: 'NOTIFICATION notification.',
    },
  ],
};
Notification.parameters = {
  docs: {
    source: {
      code: `
const notifications = [
  { id: 0, type: 'notification', message: 'Hello' }
]

<HdNotifications
  :notifications="notifications"
/>
      `,
    },
  },
};

export const Info = Template.bind({});
Info.args = {
  notifications: [
    {
      id: 0,
      type: TYPES.INFO,
      message: 'INFO notification.',
    },
  ],
};
Info.parameters = {
  docs: {
    source: {
      code: `
const notifications = [
  { id: 0, type: 'info', message: 'Hello' }
]

<HdNotifications
  :notifications="notifications"
/>
      `,
    },
  },
};

export const Success = Template.bind({});
Success.args = {
  notifications: [
    {
      id: 0,
      type: TYPES.SUCCESS,
      message: 'SUCCESS notification.',
    },
  ],
};
Success.parameters = {
  docs: {
    source: {
      code: `
const notifications = [
  { id: 0, type: 'success', message: 'Hello' }
]

<HdNotifications
  :notifications="notifications"
/>
      `,
    },
  },
};

export const UsingScopedSlots = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdNotifications },
  template: `
    <HdNotifications
      :notifications="notifications"
    >
      <template #default="{ notification }">
        <span>
          {{ notification.text }}
        </span>
        <a
          href="#"
          style="color: currentColor"
          @click.prevent="notification.onClick"
        >
          {{ notification.urlLabel }}
        </a>
      </template>
    </HdNotifications>
  `,
});
UsingScopedSlots.args = {
  notifications: [
    {
      id: 0,
      type: TYPES.NOTIFICATION,
      text: 'Custom notification',
      urlLabel: 'Say "Hi" in the console',
      onClick: () => console.log('Hi from custom notification'),
    },
  ],
};
UsingScopedSlots.parameters = {
  docs: {
    source: {
      code: `
const notifications = [
  {
    id: 0,
    type: TYPES.NOTIFICATION,
    text: 'Custom notification',
    urlLabel: 'Say "Hi" in the console',
    onClick: () => console.log('Hi from custom notification'),
  }
]

<HdNotifications
  :notifications="notifications"
>
  <template #default="{ notification }">
    <span>
      {{ notification.text }}
    </span>
    <a
      href="#"
      style="color: currentColor"
      @click.prevent="notification.onClick"
    >
      {{ notification.urlLabel }}
    </a>
  </template>
</HdNotifications>
      `,
    },
  },
};
