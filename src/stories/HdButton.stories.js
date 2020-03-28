/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';
import {
  HdButton,
  HdButtonTypes as TYPES,
} from 'homeday-blocks';

const stories = storiesOf('Components|HdButton', module);

Object.entries(TYPES)
  .forEach(([type, modifier]) => stories.add(type, () => ({
    components: { HdButton },
    data() {
      return { type, modifier };
    },
    template: `
      <HdButton
        :modifier=modifier
        @click="onClick"
      >{{ type }}</HdButton>
    `,
    methods: {
      onClick: action('onClick'),
    },
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
    methods: {
      onClick: action('onClick'),
    },
    template: `
      <HdButton
        :modifier=modifier
        @click="onClick"
      >{{ text }}</HdButton>
    `,
  }), { percy: { skip: true } });
