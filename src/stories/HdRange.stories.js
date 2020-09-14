/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { HdRange } from 'homeday-blocks';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import {
  number,
  boolean,
  text,
} from '@storybook/addon-knobs';

storiesOf('Components/Form/HdRange', module)
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
  }))
  .add('with custom tooltip value', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          v-model="currentValue"
          :min="0"
          :max="6"
          displayTooltip
          :tooltipValue="tooltipValue"
        />
        <p>Value: {{ currentValue }}</p>
      </div>
    `,
    data() {
      return {
        currentValue: 0,
      };
    },
    computed: {
      tooltipValue() {
        return [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ][this.currentValue];
      },
    },
  }))
  .add('with labels', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          v-model="currentValue"
          :min="0"
          :max="6"
          displayStepBullets
          :labels="labels"
        />
        <p>Value: {{ currentValue }}</p>
      </div>
    `,
    data() {
      return {
        currentValue: 0,
        labels: [
          'Mon.',
          'Tue.',
          'Wed.',
          'Thu.',
          'Fri.',
          'Sat.',
          'Sun.',
        ],
      };
    },
  }))
  .add('custom backgrounds 🎛', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          v-model="currentValue"
          :min="0"
          :max="4"
          :track-background="trackBackground"
          :progress-background="progressBackground"
        />
        <p>Value: {{ currentValue }}</p>
      </div>
    `,
    props: {
      trackBackground: {
        type: String,
        default: text('track-background', 'radial-gradient(circle at center, #4CBA38, #FFE713, #E00016)'),
      },
      progressBackground: {
        type: String,
        default: text('progress-background', 'transparent'),
      },
    },
    data() {
      return {
        currentValue: 2,
      };
    },
  }));
