/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import { ALL, TYPES } from 'hd-blocks/components/buttons/TYPES';
import HdButton from 'hd-blocks/components/buttons/HdButton.vue';

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
        default: select('Modifier', ALL, TYPES.default),
      },
    },
    template: `
      <HdButton
        :text=text
        :modifier=modifier
      />
    `,
  }));
