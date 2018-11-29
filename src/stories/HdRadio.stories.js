/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdRadio from '../components/form/HdRadio.vue';
import ITEMS from './mocks/RADIOS';

storiesOf('Form/HdRadio', module)
  .add('required', () => ({
    components: { HdRadio },
    template: `
    <div>
      <hd-radio ref="myRadio" @dataChange="onDataChange" :items="ITEMS" :required="true" label="Label" />
      <button @click="validate">Validate (Check action logger)</button>
    </div>
    `,
    methods: {
      onDataChange({ value, error }) {
        this.radioData = { value, error };
      },
      validate() {
        this.$refs.myRadio.validityCheck();
        if (this.radioData.error) {
          console.log('Not Valid');
        } else {
          console.log(`Valid! You selected: ${this.radioData.value}`);
        }
      },
    },
    data() {
      return {
        ITEMS,
        radioData: null,
      };
    },
  }))
  .add('preselected', () => ({
    components: { HdRadio },
    template: '<hd-radio @dataChange="onDataChange" :items="ITEMS" selected="blue" label="Label..." />',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        ITEMS,
      };
    },
  }))
  .add('vertical', () => ({
    components: { HdRadio },
    template: '<hd-radio @dataChange="onDataChange" :items="ITEMS" :vertical="true" :required="true" label="Label"/>',
    methods: { onDataChange: action('dataChange') },
    data() {
      return {
        ITEMS,
      };
    },
  }));
