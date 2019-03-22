/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import {
  withKnobs, select, boolean,
} from '@storybook/addon-knobs';

import HdArrowButton from 'hd-blocks/components/buttons/HdArrowButton.vue';

storiesOf('HdArrowButton', module)
  .addDecorator(withKnobs)
  .add('right', () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'right',
      };
    },
    template: `<hd-arrow-button
      :direction=direction
    />`,
  }))
  .add('left', () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'left',
      };
    },
    template: `<hd-arrow-button
      :direction=direction
    />`,
  }))
  .add('disabled', () => ({
    components: { HdArrowButton },
    data() {
      return {
        direction: 'left',
        disabled: true,
      };
    },
    template: `<hd-arrow-button
      :direction=direction
      :disabled=disabled
    />`,
  }))
  .add('playground', () => ({
    components: { HdArrowButton },
    props: {
      direction: {
        default: select('Arrow direction', ['right', 'left'], 'right'),
      },
      disabled: {
        default: boolean('Button disabled state', false),
      },
    },
    template: `<hd-arrow-button
      :direction="direction"
      :disabled="disabled"
    />`,
  }));
