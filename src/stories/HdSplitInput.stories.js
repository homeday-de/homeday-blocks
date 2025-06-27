/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdSplitInput from 'homeday-blocks/src/components/form/HdSplitInput.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_user.svg';

export default {
  title: 'Components/Forms/HdSplitInput',
  decorators: [FormWrapper],
};

export const Required = {
  render: () => ({
    components: { HdSplitInput },
    template: `
        <HdSplitInput
          v-model="value"
          :fields="fields"
          :required="true"
          name="test"
          label="Label"
        />
      `,
    data() {
      return {
        value: {},
      };
    },
    computed: {
      fields() {
        return [
          {
            placeholder: 'Input 1',
            name: 'value1',
          },
          {
            placeholder: 'Input 2',
            name: 'value2',
          },
        ];
      },
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }),

  name: 'required',
};

export const Disabled = {
  render: () => ({
    components: { HdSplitInput },
    template: `
        <HdSplitInput
          v-model="value"
          :fields="fields"
          :disabled="true"
          name="test"
          label="Label"
        />
      `,
    data() {
      return {
        value: {},
      };
    },
    computed: {
      fields() {
        return [
          {
            placeholder: 'Input 1',
            name: 'value1',
          },
          {
            placeholder: 'Input 2',
            name: 'value2',
          },
        ];
      },
    },
  }),

  name: 'disabled',
};

export const WithIcon = {
  render: (_args, { argTypes }) => ({
    components: { HdSplitInput },
    template: `
    <HdSplitInput
      v-model="value"
      :fields="fields"
      :icon="icon"
      name="test"
      label="Label"
    />
  `,
    props: Object.keys(argTypes),
    data() {
      return {
        value: {},
      };
    },
    computed: {
      fields() {
        return [
          {
            placeholder: 'Input 1',
            name: 'value1',
          },
          {
            placeholder: 'Input 2',
            name: 'value2',
          },
        ];
      },
    },
  }),
  args: {
    icon,
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
    },
  },

  name: 'with icon 🎛',
};

export const CustomSeparator = {
  render: (_args, { argTypes }) => ({
    components: { HdSplitInput },
    template: `
    <HdSplitInput
      v-model="value"
      :fields="fields"
      :separator="separator"
      name="test"
      label="Date"
    />
  `,
    props: Object.keys(argTypes),
    data() {
      return {
        value: {},
      };
    },
    computed: {
      fields() {
        return [
          {
            placeholder: 'Day',
            name: 'day',
            type: 'number',
            min: 0,
            max: 31,
          },
          {
            placeholder: 'Month',
            name: 'month',
            type: 'number',
            min: 0,
            max: 12,
          },
          {
            placeholder: 'Year',
            name: 'year',
            type: 'number',
            min: 1900,
            max: 2019,
          },
        ];
      },
    },
    watch: {
      value: {
        deep: true,
        handler(value) {
          action('input')(value);
        },
      },
    },
  }),
  args: {
    separator: '/',
  },
  argTypes: {
    separator: {
      name: 'Separator',
      control: { type: 'text' },
    },
  },

  name: 'Custom separator 🎛',
};

export const DynamicExampleRange = {
  render: () => ({
    components: { HdSplitInput },
    template: `
        <HdSplitInput
          v-model="value"
          :fields="fields"
          :required="true"
          name="test"
          label="Range"
          @fieldBlur="onFieldBlur"
        />
      `,
    data() {
      return {
        value: {
          min: 10,
          max: 100,
        },
        allowedRange: {
          min: 0,
          max: 1000,
        },
        minDif: 10,
      };
    },
    computed: {
      fields() {
        return [
          {
            placeholder: 'Min',
            name: 'min',
            type: 'number',
          },
          {
            placeholder: 'Max',
            name: 'max',
            type: 'number',
          },
        ];
      },
    },
    methods: {
      onFieldBlur({ name }) {
        let newMin = parseInt(this.value.min, 10);
        let newMax = parseInt(this.value.max, 10);
        // We make sure we are in the allowed range
        newMin = newMin < this.allowedRange.min ? this.allowedRange.min : newMin;
        newMin = newMin < this.allowedRange.min ? this.allowedRange.min : newMin;

        if (name === 'min' && newMin + this.minDif > newMax) {
          newMax = newMin + this.minDif;
          if (newMax > this.allowedRange.max) {
            newMin = this.allowedRange.max - this.minDif;
            newMax = this.allowedRange.max;
          }
        } else if (name === 'max' && newMax - this.minDif < newMin) {
          newMin = newMax - this.minDif;
          if (newMin < this.allowedRange.min) {
            newMin = this.allowedRange.min;
            newMax = this.allowedRange.min + this.minDif;
          }
        }

        this.value.min = newMin;
        this.value.max = newMax;
      },
    },
  }),

  name: 'Dynamic example: Range',
};
