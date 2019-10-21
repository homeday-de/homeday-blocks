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
          :minValue=minValue
          :maxValue=maxValue
          :rangeStep=rangeStep
          :value="value"
          :disabled="disabled"
        />
      </div>
    `,
    props: {
      minValue: {
        type: Number,
        default: number('Minimum Value', 0),
      },
      maxValue: {
        type: Number,
        default: number('Maximum Value', 100),
      },
      value: {
        type: Number,
        default: number('Value', 25),
      },
      rangeStep: {
        type: Number,
        default: number('Step', 1),
      },
      disabled: {
        type: Boolean,
        default: boolean('Disabled', false),
      },
    },
    watch: {
    },
  }));
