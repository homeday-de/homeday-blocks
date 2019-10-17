/* eslint-disable import/no-extraneous-dependencies */
import { sanitize } from 'dompurify';
import { storiesOf } from '@storybook/vue';
import {
  text,
  boolean,
  select,
} from '@storybook/addon-knobs';
import HdAlert from 'hd-blocks/components/HdAlert.vue';

storiesOf('HdAlert', module)
  .add('Info (default)', () => ({
    components: { HdAlert },
    template: `
      <HdAlert
        message="Karaoke means &#8220;empty orchestra&#8221; in Japanese."
      />
    `,
  }))
  .add('Success', () => ({
    components: { HdAlert },
    template: `
      <HdAlert
        type="success"
        message="A success message"
      />
    `,
  }))
  .add('Warning', () => ({
    components: { HdAlert },
    template: `
      <HdAlert
        type="warning"
        message="A warning message"
      />
    `,
  }))
  .add('Error', () => ({
    components: { HdAlert },
    template: `
      <HdAlert
        type="error"
        message="An error message"
      />
    `,
  }))
  .add('Playground 🎛📝', () => ({
    components: { HdAlert },
    props: {
      type: {
        type: String,
        default: select('type', ['', 'success', 'info', 'warning', 'error']),
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
