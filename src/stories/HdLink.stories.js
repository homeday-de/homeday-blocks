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
        default: text('Text', 'Loader Button Label'),
      },
      modifier: {
        type: String,
        default: select('Modifier', ['primary', 'secondary'], 'primary'),
      },
    },
    template: `
      <HdLink
        :text=text
        :modifier=modifier
        href="www.homeday.de"
      />
    `,
  }), {
    notes: {
      markdown: HdLinkNote,
    },
  });
