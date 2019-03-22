/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdSelect from 'hd-blocks/components/form/HdSelect.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';
import ITEMS from './mocks/FORM_ITEMS';

storiesOf('Form/HdSelect', module)
  .addDecorator(FormWrapper)
  .add('required', () => ({
    components: { HdSelect },
    template: `
      <div>
        <hd-select
          v-model="value"
          ref="myRadio"
          :options="ITEMS"
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
  }))
  .add('preselected', () => ({
    components: { HdSelect },
    template: `
      <div>
        <hd-select
          v-model="value"
          :options="ITEMS"
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
  }));
