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
          :minValue="minValue"
          :maxValue="maxValue"
          :rangeStep="rangeStep"
          :disabled="disabled"
          :displayStepBullets="displayStepBullets"
          v-model="currentValue"
        />
        <p>This values {{ currentValue }}</p>
      </div>
    `,
    props: {
      value: {
        type: Number,
        default: number('Value', 50),
      },
      minValue: {
        type: Number,
        default: number('Minimum Value', 0),
      },
      maxValue: {
        type: Number,
        default: number('Maximum Value', 100),
      },
      rangeStep: {
        type: Number,
        default: number('Step', 10),
      },
      disabled: {
        type: Boolean,
        default: boolean('Disabled', false),
      },
      displayStepBullets: {
        type: Boolean,
        default: boolean('Display step bullets', true),
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
  .add('without steps', () => ({
    components: { HdRange },
    template: `
      <div>
        <HdRange
          :minValue="0"
          :maxValue="100"
          :rangeStep="10"
          :disabled="false"
          :displayStepBullets="false"
          v-model="currentValue"
        />
        <p>This values {{ currentValue }}</p>
      </div>
    `,
    data() {
      return {
        currentValue: 50,
      };
    },
  }));
