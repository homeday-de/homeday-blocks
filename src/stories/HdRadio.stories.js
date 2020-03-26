/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { HdRadio } from 'homeday-blocks';
import ITEMS from './mocks/FORM_ITEMS';

storiesOf('Form/HdRadio', module)
  .add('required', () => ({
    components: { HdRadio },
    template: `
      <div>
        <HdRadio
          v-model="value"
          ref="myRadio"
          :items="ITEMS"
          :required="true"
          name="test"
          label="Label"
        />
        <button @click="validate">
          Validate (Check action logger)
        </button>
      </div>
    `,
    data() {
      return {
        value: '',
        ITEMS,
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
    methods: {
      validate() {
        const isValid = this.$refs.myRadio.validate();

        if (!isValid) {
          console.log('Not Valid');
        } else {
          console.log(`Valid! You selected: ${this.value}`);
        }
      },
    },
  }), { percy: { skip: true } })
  .add('preselected', () => ({
    components: { HdRadio },
    template: `
      <div>
        <HdRadio
          v-model="value"
          ref="myRadio"
          :items="ITEMS"
          name="test"
          label="Label"
        />
      </div>
    `,
    data() {
      return {
        value: ITEMS[2].value,
        ITEMS,
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }))
  .add('vertical', () => ({
    components: { HdRadio },
    template: `
      <div>
        <HdRadio
          v-model="value"
          ref="myRadio"
          :items="ITEMS"
          :vertical="true"
          name="test"
          label="Label"
        />
      </div>
    `,
    data() {
      return {
        value: '',
        ITEMS,
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }))
  .add('disabled', () => ({
    components: { HdRadio },
    template: `
      <div>
        <HdRadio
          v-model="value"
          ref="myRadio"
          :items="ITEMS"
          :disabled="true"
          name="test"
          label="Label"
        />
      </div>
    `,
    data() {
      return {
        value: ITEMS[0].value,
        ITEMS,
      };
    },
  }));
