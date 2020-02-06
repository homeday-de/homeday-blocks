/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import HdSplitInput from 'homeday-blocks/src/components/form/HdSplitInput.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_user.svg';

storiesOf('Form/HdSplitInput', module)
  .addDecorator(FormWrapper)
  .add('required', () => ({
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
  }))
  .add('disabled', () => ({
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
  }))
  .add('with icon 🎛', () => ({
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
    props: {
      icon: {
        type: String,
        default: text('icon', icon),
      },
    },
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
  }))
  .add('Custom separator 🎛', () => ({
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
    props: {
      separator: {
        default: text('Separator', '/'),
      },
    },
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
  }))
  .add('Dynamic example: Range', () => ({
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
  }));
