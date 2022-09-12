/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import HdSelect from 'homeday-blocks/src/components/form/HdSelect.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import ITEMS from './mocks/FORM_ITEMS';
import icon from './assets/ic_user.svg';

storiesOf('Components/Form/HdSelect', module)
  .addDecorator(FormWrapper)
  .add(
    'required',
    () => ({
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
    }),
    { percy: { skip: true } }
  )
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
  }))
  .add('disabled', () => ({
    components: { HdSelect },
    template: `
      <div>
        <hd-select
          v-model="value"
          :options="ITEMS"
          :disabled="true"
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
  }))
  .add('with icon 🎛', () => ({
    components: { HdSelect },
    template: `
      <div>
        <hd-select
          v-model="value"
          :options="ITEMS"
          :icon="icon"
          name="test"
          label="Label"
        />
      </div>
    `,
    props: {
      icon: {
        type: String,
        default: text('icon', icon),
      },
    },
    data() {
      return {
        value: ITEMS[2].value,
        ITEMS,
      };
    },
  }));
