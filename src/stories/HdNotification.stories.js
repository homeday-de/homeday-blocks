import HdNotification from 'homeday-blocks/src/components/notifications/HdNotification.vue';
import TYPES from 'homeday-blocks/src/components/notifications/HdNotificationsTypes';

export default {
  title: 'Components/Indicators/HdNotification',
  component: HdNotification,
  argTypes: {
    type: {
      control: { type: 'select', options: Object.values(TYPES), default: TYPES.NOTIFICATION },
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

const Template = (args, { argTypes }) => ({
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

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  type: TYPES.ERROR,
  message: 'ERROR notification.',
};
Error.parameters = {
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
};

export const Notification = Template.bind({});
Notification.args = {
  type: TYPES.NOTIFICATION,
  message: 'NOTIFICATION notification.',
};
Notification.parameters = {
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
};

export const Info = Template.bind({});
Info.args = {
  type: TYPES.INFO,
  message: 'INFO notification.',
};
Info.parameters = {
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
};

export const Success = Template.bind({});
Success.args = {
  type: TYPES.SUCCESS,
  message: 'SUCCESS notification.',
};
Success.parameters = {
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
};

export const UsingScopedSlots = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdNotification },
  template: `
    <HdNotification>
      Custom value <b>HERE!</b>
    </HdNotification>
  `,
});
UsingScopedSlots.parameters = {
  docs: {
    source: {
      code: `
<HdNotification>
  Custom value <b>HERE!</b>
</HdNotification>
      `,
    },
  },
};
