/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import { HdDashedList } from 'homeday-blocks';
import ITEMS from './mocks/DASHED_LIST_ITEMS';

const stories = storiesOf('Components|HdDashedList', module);

stories.add('Playground 🎛', () => ({
  components: { HdDashedList },
  props: {
    expandedLabel: {
      type: Boolean,
      default: boolean('expandedLabel', false),
    },
  },
  data() {
    return {
      items: ITEMS,
    };
  },
  template: `
    <HdDashedList :items="items" :expandedLabel="expandedLabel" />
  `,
}));
