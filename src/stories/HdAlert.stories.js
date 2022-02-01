import HdAlert from 'homeday-blocks/src/components/HdAlert.vue';
import TYPES from 'homeday-blocks/src/components/HdAlertTypes';
import DeprecatedWrapper from 'homeday-blocks/src/storiesWrappers/DeprecatedWrapper';

export default {
  title: 'Components/HdAlert (Deprecated)',
  component: HdAlert,
  argTypes: {
    type: {
      control: { type: 'select', options: Object.keys(TYPES) },
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    text: {
      control: 'text',
      description: 'Text default slot of the alert',
    },
  },
  args: {
    text: 'Karaoke means “empty orchestra” in Japanese.',
    type: 'info',
    noIcon: false,
  },
  decorators: [DeprecatedWrapper],
  parameters: {
    docs: {
      description: {
        component: 'This component is deprecated, please use <b>HdNotifications</b> component**',
      },
      source: {
        code: `
<HdAlert
  :type="type"
  :icon="icon"
  :no-icon="noIcon"
>
  {{ text }}
</HdAlert>
        `,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdAlert },
  template: `
    <HdAlert
      :type="type"
      :icon="icon"
      :no-icon="noIcon"
    >
      {{ text }}
    </HdAlert>
  `,
});

export const Default = Template.bind({});

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  text: 'A message with type: info',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  text: 'A message with type: success',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  text: 'A message with type: warning',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  text: 'A message with type: error',
};
