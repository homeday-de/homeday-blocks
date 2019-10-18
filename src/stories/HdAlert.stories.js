/* eslint-disable import/no-extraneous-dependencies */
import { sanitize } from 'dompurify';
import { storiesOf } from '@storybook/vue';
import {
  text,
  boolean,
  select,
} from '@storybook/addon-knobs';
import HdAlert, { TYPES } from 'hd-blocks/components/HdAlert.vue';

const TYPES_ARRAY = Object.keys(TYPES);

const stories = storiesOf('HdAlert', module);

stories.add('Default', () => ({
  components: { HdAlert },
  template: `
    <HdAlert
      message="Karaoke means &#8220;empty orchestra&#8221; in Japanese."
    />
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
      <HdAlert
        :type="type"
        :message="message"
      />
    `,
  }));
});

stories.add('Playground 🎛', () => ({
  components: { HdAlert },
  props: {
    type: {
      type: String,
      default: select('type', TYPES_ARRAY),
    },
    message: {
      type: String,
      default: text(
        'message',
        'A message with some <a class="link">html</a>',
      ),
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
      :message="sanitize(message)"
      :icon="icon"
      :no-icon="noIcon"
    />
  `,
  methods: {
    sanitize,
  },
}),
{
  knobs: {
    escapeHTML: false,
  },
});
