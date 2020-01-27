/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';

import HdRange from 'hd-blocks/components/form/HdRange.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';
import { number, boolean } from '@storybook/addon-knobs';

storiesOf('Form/HdRange', module)
  .addDecorator(FormWrapper)
  .add('default 🎛', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :displayStepBullets="displayStepBullets"
          v-model="currentValue"
        />
        <p>Value: {{ currentValue }}</p>
      </div>
    `,
    props: {
      value: {
        type: Number,
        default: number('value', 50),
      },
      min: {
        type: Number,
        default: number('min', 0),
      },
      max: {
        type: Number,
        default: number('max', 100),
      },
      step: {
        type: Number,
        default: number('step', 10),
      },
      disabled: {
        type: Boolean,
        default: boolean('disabled', false),
      },
      displayStepBullets: {
        type: Boolean,
        default: boolean('displayStepBullets', false),
      },
    },
    watch: {
      value() {
        this.currentValue = this.value;
      },
    },
    data() {
      return {
        currentValue: this.value,
      };
    },
  }))
  .add('with bullets', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          :min="0"
          :max="100"
          :step="20"
          :disabled="false"
          displayStepBullets
          v-model="currentValue"
        />
        <p>Value: {{ currentValue }}</p>
      </div>
    `,
    data() {
      return {
        currentValue: 50,
      };
    },
  }))
  .add('with tooltip', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          :min="0"
          :max="100"
          :step="10"
          displayTooltip
          v-model="currentValue"
        />
        <p>Value: {{ currentValue }}</p>
      </div>
    `,
    data() {
      return {
        currentValue: 50,
      };
    },
  }));
