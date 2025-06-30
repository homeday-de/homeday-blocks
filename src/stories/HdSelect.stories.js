/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdSelect from 'homeday-blocks/src/components/form/HdSelect.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import ITEMS from './mocks/FORM_ITEMS';
import icon from './assets/ic_user.svg';

export default {
  title: 'Components/Selection Controls/HdSelect',
  decorators: [FormWrapper],
};

export const Required = {
  render: () => ({
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
  parameters: { percy: { skip: true } },

  name: 'required',
};

export const Preselected = {
  render: () => ({
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
  }),

  name: 'preselected',
};

export const Disabled = {
  render: () => ({
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
  }),

  name: 'disabled',
};

export const WithIcon = {
  render: (_args, { argTypes }) => ({
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
    props: Object.keys(argTypes),
    data() {
      return {
        value: ITEMS[2].value,
        ITEMS,
      };
    },
  }),
  args: {
    icon,
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
    },
  },

  name: 'with icon 🎛',
};
