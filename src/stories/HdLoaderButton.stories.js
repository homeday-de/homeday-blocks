import { HdLoaderButton } from 'homeday-blocks';
import hdLoaderButtonNote from '../notes/HdLoaderButton.md';

export default {
  title: 'Components/HdLoaderButton',
  component: HdLoaderButton,
  argTypes: {
    click: {
      action: 'click',
    },
    success: {
      action: 'success',
    },
    error: {
      action: 'error',
    },
    resetOnSuccess: {
      description: 'Reset on success state?',
    },
    idleResetTime: {
      description: 'Reset time?',
    },
    loadingState: {
      control: {
        type: null,
      },
    },
  },
  args: {
    label: 'Loader Button Label',
    isStatic: true,
    idleResetTime: 200,
    resetOnSuccess: true,
    loadingCircleStrokeWidth: 4,
    buttonHeight: 46,
    disabled: false,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdLoaderButton },
  template: `
    <HdLoaderButton
      @click="click"
      @success="success"
      @error="error"
      :label=label
      :is-static="isStatic"
      :idle-reset-time="idleResetTime"
      :reset-on-success="resetOnSuccess"
      :loading-circle-stroke-width="loadingCircleStrokeWidth"
      :button-height="buttonHeight"
      :disabled="disabled"
    />
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: hdLoaderButtonNote,
    },
  },
};
