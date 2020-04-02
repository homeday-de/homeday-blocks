/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text, boolean, select } from '@storybook/addon-knobs';
import {
  HdBadge,
  HdBadgeTypes as TYPES,
} from 'homeday-blocks';

storiesOf('Components|HdBadge', module)
  .add('Playground without details', () => ({
    components: { HdBadge },
    props: {
      label: {
        type: String,
        default: text('Label', 'Badge'),
      },
      modifier: {
        type: String,
        default: select('Modifier', Object.values(TYPES), TYPES.default),
      },
      icon: {
        type: String,
        default: text('icon (url)'),
      },
      showIconBefore: {
        type: Boolean,
        default: boolean('show-icon-before', true),
      },
    },
    template: `
      <HdBadge
        :label=label
        :modifier=modifier
        :icon="icon"
        :show-icon-before="showIconBefore"
      />
    `,
  }))
  .add('Playground with details', () => ({
    components: { HdBadge },
    props: {
      label: {
        type: String,
        default: text('Label', 'Badge'),
      },
      details: {
        type: String,
        default: text('Details', 'test badge details!'),
      },
      modifier: {
        type: String,
        default: select('Modifier', Object.values(TYPES), TYPES.default),
      },
      icon: {
        type: String,
        default: text('icon (url)'),
      },
      showIconBefore: {
        type: Boolean,
        default: boolean('show-icon-before', true),
      },
    },
    template: `
      <HdBadge
        :label=label
        :modifier=modifier
        :icon="icon"
        :show-icon-before="showIconBefore"
      >
        <template>{{details}}</template>
      </HdBadge>
    `,
  }));
