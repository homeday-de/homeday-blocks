/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
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
      isInDarkBackground: {
        default: boolean('Dark background', false),
      },
      disabled: {
        default: boolean('Disabled', false),
      },
    },
    data() {
      return {
        styleWrapper: {
          position: 'relative',
          width: '100vw',
          height: '100vh',
          padding: '50px',
        },
        styleDarkBackground: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#1C3553',
          zIndex: -1,
        },
      };
    },
    methods: {
      onClick: action('onClick'),
    },
    template: `
      <div :style="styleWrapper">
        <HdButton
          :modifier=modifier
          :isInDarkBackground=isInDarkBackground
          :disabled=disabled
          @click="onClick"
        >{{ text }}</HdButton>
        <div v-if="isInDarkBackground" :style="styleDarkBackground" />
      </div>
    `,
  }), { percy: { skip: true } });
