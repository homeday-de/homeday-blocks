import HdRange from 'homeday-blocks/src/components/form/HdRange.vue';

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

export const Default = {
  render: Template,
};

export const WithBullets = {
  render: Template,
  args: {
    displayStepBullets: true,
    step: 20,
  },
};

export const WithTooltip = {
  render: Template,
  args: {
    displayTooltip: true,
  },
};

export const WithLabels = {
  render: (_, { argTypes }) => ({
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
  }),
  args: {
    min: 0,
    max: 6,
    displayStepBullets: true,
    labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
  },
};

export const CustomBackgrounds = {
  render: Template,
  args: {
    trackBackground: 'radial-gradient(circle at center, #4CBA38, #FFE713, #E00016)',
    progressBackground: 'transparent',
  },
  argTypes: {
    'track-background': {
      name: 'Track Background',
      control: { type: 'text' },
    },
    'progress-background': {
      name: 'Progress Background',
      control: { type: 'text' },
    },
  },
};

export const WithCustomTooltipValue = {
  render: (_, { argTypes }) => ({
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
  }),
  args: {
    ...WithLabels.args,
    displayTooltip: true,
  },
};

export const WithCustomStepBullets = {
  render: (_, { argTypes }) => ({
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
  }),
};
