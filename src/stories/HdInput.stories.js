/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdInput from 'homeday-blocks/src/components/form/HdInput.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_user.svg';

export default {
  title: 'Components/Forms/HdInput',
  decorators: [FormWrapper],
};

export const Required = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          :required="true"
          name="test"
          label="Label"
          placeholder="Placeholder..."
        />
      `,
    data() {
      return {
        value: '',
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }),

  name: 'required',
};

export const Prefilled = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          name="test"
          label="Label"
          placeholder="Placeholder..."
        />
      `,
    data() {
      return {
        value: 'Your default value goes here',
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }),

  name: 'prefilled',
};

export const Email = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          name="email"
          label="Email"
          placeholder="jane.doe@homeday.de"
          type="email"
        />
      `,
    data() {
      return {
        value: '',
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }),

  name: 'email',
};

export const Number = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          :min="0"
          :max="99"
          name="number"
          label="Number"
          placeholder=">= 0, < 100"
          type="number"
        />
      `,
    data() {
      return {
        value: '',
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }),

  name: 'number',
};

export const CustomTranslation = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          :required="true"
          :texts="texts"
          name="test"
          label="Label"
          placeholder="Placeholder..."
        />
      `,
    data() {
      return {
        value: '',
        texts: {
          FORM: {
            VALIDATION: {
              REQUIRED: 'Hey you, yeah you! Fill it out!',
            },
          },
        },
      };
    },
    watch: {
      value(value) {
        action('input')(value);
      },
    },
  }),

  name: 'custom translation',
};

export const Disabled = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          :disabled="true"
          name="test"
          label="Label"
          placeholder="Placeholder..."
        />
      `,
    data() {
      return {
        value: '',
      };
    },
  }),

  name: 'disabled',
};

export const WithIcon = {
  render: (_args, { argTypes }) => ({
    components: { HdInput },
    template: `
    <HdInput
      v-model="value"
      :icon="icon"
      name="test"
      label="Label"
      placeholder="Placeholder..."
    />
  `,
    props: Object.keys(argTypes),
    data() {
      return {
        value: '',
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

export const WithTypeDate = {
  render: () => ({
    components: { HdInput },
    template: `
        <HdInput
          v-model="value"
          name="test"
          label="Label"
          type="date"
        />
      `,
    data() {
      return {
        value: '',
      };
    },
  }),

  name: 'with type date',
};
