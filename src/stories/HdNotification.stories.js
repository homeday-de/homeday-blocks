import HdNotification from 'homeday-blocks/src/components/notifications/HdNotification.vue';
import TYPES from 'homeday-blocks/src/components/notifications/HdNotificationsTypes';

export default {
  title: 'Components/Indicators/HdNotification',
  component: HdNotification,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.values(TYPES),
        default: TYPES.NOTIFICATION,
      },
      table: {
        defaultValue: { summary: TYPES.NOTIFICATION },
      },
    },
    message: {
      control: 'text',
      description: 'Text default slot of the notification',
    },
    centered: {
      control: 'boolean',
      description: 'Centers the notification message',
    },
  },
  args: {
    type: TYPES.NOTIFICATION,
    message: 'This is a notification',
    centered: false,
  },
  parameters: {
    docs: {
      source: {
        code: `
<HdNotification
  type="${Object.values(TYPES).join('|')}"
  message="My custom message"
  :centered="false"
/>

<HdNotification
  type="error"
>
  Custom content here
</HdNotification>
        `,
      },
    },
  },
};

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdNotification },
  template: `
    <HdNotification
      :type="type"
      :message="message"
      :centered="centered"
    />
  `,
});

export const Default = {
  render: Template,
};

export const Error = {
  render: Template,
  args: {
    type: TYPES.ERROR,
    message: 'ERROR notification.',
  },
  parameters: {
    docs: {
      source: {
        code: `
  <HdNotification
    type="error"
    message="ERROR notification."
  />
        `,
      },
    },
  },
};

export const Notification = {
  render: Template,
  args: {
    type: TYPES.NOTIFICATION,
    message: 'NOTIFICATION notification.',
  },
  parameters: {
    docs: {
      source: {
        code: `
  <HdNotification
    type="notification"
    message="NOTIFICATION notification."
  />
        `,
      },
    },
  },
};

export const Info = {
  render: Template,
  args: {
    type: TYPES.INFO,
    message: 'INFO notification.',
  },
  parameters: {
    docs: {
      source: {
        code: `
  <HdNotification
    type="info"
    message="INFO notification."
  />
        `,
      },
    },
  },
};

export const Success = {
  render: Template,
  args: {
    type: TYPES.SUCCESS,
    message: 'SUCCESS notification.',
  },
  parameters: {
    docs: {
      source: {
        code: `
  <HdNotification
    type="success"
    message="SUCCESS notification."
  />
        `,
      },
    },
  },
};

export const UsingScopedSlots = {
  render: (_args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { HdNotification },
    template: `
      <HdNotification>
        Custom value <b>HERE!</b>
      </HdNotification>
    `,
  }),
  args: {
    message: 'Custom value <b>HERE!</b>',
  },
  parameters: {
    docs: {
      source: {
        code: `
  <HdNotification>
    Custom value <b>HERE!</b>
  </HdNotification>
        `,
      },
    },
  },
};
