/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import HdButton, { TYPES } from 'hd-blocks/components/buttons/HdButton.vue';

const stories = storiesOf('HdButton', module);

Object.entries(TYPES)
  .forEach(([type, modifier]) => stories.add(type, () => ({
    components: { HdButton },
    data() {
      return { type, modifier };
    },
    template: `
      <HdButton
        :modifier=modifier
      >{{ type }}</HdButton>
    `,
  })));

stories
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
  }), { percy: { skip: true } });
