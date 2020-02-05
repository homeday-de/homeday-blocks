/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import {
  text,
  boolean,
  select,
} from '@storybook/addon-knobs';
import HdAlert, { TYPES } from 'homeday-blocks/src/components/HdAlert.vue';

const TYPES_ARRAY = Object.keys(TYPES);

const stories = storiesOf('HdAlert', module);

stories.add('Default', () => ({
  components: { HdAlert },
  template: `
    <HdAlert>
      Karaoke means &#8220;empty orchestra&#8221; in Japanese.
    </HdAlert>
  `,
}));

TYPES_ARRAY.forEach((type) => {
  stories.add(type, () => ({
    components: { HdAlert },
    data() {
      return {
        type,
        message: `A message with type: ${type}`,
      };
    },
    template: `
      <HdAlert :type="type">
        {{ message }}
      </HdAlert>
    `,
  }));
});

stories
  .add('Playground 🎛', () => ({
    components: { HdAlert },
    props: {
      type: {
        type: String,
        default: select('type', TYPES_ARRAY),
      },
      icon: {
        type: String,
        default: text('icon (url)'),
      },
      noIcon: {
        type: Boolean,
        default: boolean('no-icon', false),
      },
    },
    template: `
      <HdAlert
        :type="type"
        :icon="icon"
        :no-icon="noIcon"
      >
        You can play around with the knobs
      </HdAlert>
    `,
  }), { percy: { skip: true } });
