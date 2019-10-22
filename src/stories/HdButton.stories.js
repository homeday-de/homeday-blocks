/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import HdButton, { TYPES } from 'hd-blocks/components/buttons/HdButton.vue';

storiesOf('HdButton', module)
  .add('Playground 🎛', () => ({
    components: { HdButton },
    props: {
      text: {
        type: String,
        default: text('Text', 'Register'),
      },
      modifier: {
        type: String,
        default: select('Modifier', Object.values(TYPES), TYPES.default),
      },
    },
    template: `
      <HdButton
        :modifier=modifier
      >{{ text }}</HdButton>
    `,
  }));
