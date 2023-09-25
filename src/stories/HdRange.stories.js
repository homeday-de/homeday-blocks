import HdRange from 'homeday-blocks/src/components/form/HdRange.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from '@storybook/addon-knobs';

export default {
  title: 'Components/Selection Controls/HdRange',
  component: HdRange,
  args: {
    name: 'storybook',
    required: false,
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    labels: [],
    displayStepBullets: false,
    displayTooltip: false,
    tooltipValue: '',
    trackBackground: '',
    progressBackground: '',
    stepBullets: [],
  },
};

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdRange },
  template: `
    <div style="margin: 64px auto; max-width: 360px;">
      <HdRange
        v-bind="$props"
        v-model="currentValue"
      />
      <p style="margin-top: 50px;">Value: {{ currentValue }}</p>
    </div>
  `,
  data() {
    return {
      currentValue: 50,
    };
  },
});

export const Default = Template.bind({});

export const WithBullets = Template.bind({});
WithBullets.args = {
  displayStepBullets: true,
  step: 20,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  displayTooltip: true,
};

export const WithLabels = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdRange },
  template: `
    <div style="margin: 64px auto; max-width: 360px;">
      <HdRange
        v-bind="$props"
        v-model="currentValue"
      />
      <p style="margin-top: 50px;">Value: {{ currentValue }}</p>
    </div>
  `,
  data() {
    return {
      currentValue: 2,
    };
  },
});
WithLabels.args = {
  min: 0,
  max: 6,
  displayStepBullets: true,
  labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
};

export const CustomBackgrounds = Template.bind({});
CustomBackgrounds.args = {
  trackBackground: text(
    'track-background',
    'radial-gradient(circle at center, #4CBA38, #FFE713, #E00016)'
  ),
  progressBackground: text('progress-background', 'transparent'),
};

export const WithCustomTooltipValue = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdRange },
  template: `
    <div style="margin: 64px auto; max-width: 360px;">
      <HdRange
        v-bind="$props"
        :tooltipValue="tooltipVal"
        v-model="currentValue"
      />
      <p style="margin-top: 50px;">Value: {{ currentValue }}</p>
    </div>
  `,
  data() {
    return {
      currentValue: 2,
    };
  },
  computed: {
    tooltipVal() {
      return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][
        this.currentValue
      ];
    },
  },
});
WithCustomTooltipValue.args = {
  ...WithLabels.args,
  displayTooltip: true,
};

export const WithCustomStepBullets = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HdRange },
  template: `
    <div style="margin: 64px auto; max-width: 360px;">
      <HdRange
        v-bind="$props"
        :min="1"
        :max="100"
        :step-bullets="[1, 26, 40, 95, 100]"
        v-model="currentValue"
      />
      <p style="margin-top: 50px;">Value: {{ currentValue }}</p>
    </div>
  `,
  data() {
    return {
      currentValue: 26,
    };
  },
});
