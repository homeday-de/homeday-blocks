/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import HdLink from 'hd-blocks/components/HdLink.vue';
import HdLinkNote from '../notes/HdLink.md';

storiesOf('HdLink', module)
  .add('Playground 🎛📝', () => ({
    components: { HdLink },
    props: {
      text: {
        type: String,
        default: text('Text (<slot>)', 'Awesome link'),
      },
      modifier: {
        type: String,
        default: select('Modifier', ['primary', 'secondary'], 'primary'),
      },
    },
    template: `
      <HdLink
        :modifier=modifier
        href="https://www.homeday.de"
      >
        {{ text }}
      </HdLink>
    `,
  }), {
    notes: {
      markdown: HdLinkNote,
    },
  });
