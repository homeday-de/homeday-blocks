/* eslint-disable import/no-extraneous-dependencies */
import { action } from '@storybook/addon-actions';
import HdTextarea from 'homeday-blocks/src/components/form/HdTextarea.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_user.svg';

export default {
  title: 'Components/Forms/HdTextarea',
  decorators: [FormWrapper],
};

export const Required = {
  render: () => ({
    components: { HdTextarea },
    template: `
        <HdTextarea
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
    components: { HdTextarea },
    template: `
        <HdTextarea
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

export const CustomTranslation = {
  render: () => ({
    components: { HdTextarea },
    template: `
    <HdTextarea
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
  parameters: { percy: { skip: true } },

  name: 'custom translation',
};

export const Disabled = {
  render: () => ({
    components: { HdTextarea },
    template: `
        <HdTextarea
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

export const Maxlength = {
  render: () => ({
    components: { HdTextarea },
    template: `
        <HdTextarea
          v-model="value"
          :maxlength="500"
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

  name: 'maxlength',
};

export const WithIcon = {
  render: () => ({
    components: { HdTextarea },
    template: `
        <HdTextarea
          v-model="value"
          :icon="icon"
          name="test"
          label="Label"
          placeholder="Placeholder..."
        />
      `,
    data() {
      return {
        value: '',
        icon,
      };
    },
  }),

  name: 'with icon',
};
