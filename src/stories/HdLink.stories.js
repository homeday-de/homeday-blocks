/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import HdLink, { TYPES } from 'homeday-blocks/src/components/HdLink.vue';
import HdLinkNote from '../notes/HdLink.md';

const stories = storiesOf('HdLink', module);

TYPES.forEach((modifier) => {
  const capitalizedModifier = modifier.charAt(0).toUpperCase() + modifier.slice(1);

  stories.add(capitalizedModifier, () => ({
    components: { HdLink },
    data() {
      return { modifier, capitalizedModifier };
    },
    template: `
      <HdLink
        :modifier=modifier
        href="https://www.homeday.de"
      >
        {{ capitalizedModifier }}
      </HdLink>
    `,
  }));
});

stories
  .add('Playground 🎛📝', () => ({
    components: { HdLink },
    props: {
      text: {
        type: String,
        default: text('Text (<slot>)', 'Awesome link'),
      },
      modifier: {
        type: String,
        default: select('Modifier', TYPES, TYPES[0]),
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
    percy: { skip: true },
  });
