/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdRadio from '../components/form/HdRadio.vue';

const items = [
  {
    label: 'Frau',
    value: 'female',
  },
  {
    label: 'Herr',
    value: 'male',
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
    template: '<hd-radio @dataChange="onDataChange" :items="items" selected="male" value="Your default value goes here" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        items,
      };
    },
  }))
  .add('vertical', () => ({
    components: { HdRadio },
    template: '<hd-radio @dataChange="onDataChange" :items="items" required="true" label="Label" vertical="true"/>',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        items,
      };
    },
  }));
