/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdRadio from '../components/form/HdRadio.vue';

const items = [
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Yellow',
    value: 'yellow',
  },
];

storiesOf('HdRadio', module)
  .add('required', () => ({
    components: { HdRadio },
    template: '<hd-radio @dataChange="onDataChange" :items="items" required="true" label="Label" />',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        items,
      };
    },
  }))
  .add('preselected', () => ({
    components: { HdRadio },
    template: '<hd-radio @dataChange="onDataChange" :items="items" selected="blue" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        items,
      };
    },
  }))
  .add('vertical', () => ({
    components: { HdRadio },
    template: '<hd-radio @dataChange="onDataChange" :items="items" vertical="true" required="true" label="Label"/>',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        items,
      };
    },
  }));
