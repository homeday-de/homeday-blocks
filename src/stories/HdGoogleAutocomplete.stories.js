import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import HdGoogleAutocomplete from 'homeday-blocks/src/components/form/HdGoogleAutocomplete.vue';

export default {
  title: 'Components/Forms/HdGoogleAutocomplete',
  decorators: [FormWrapper],
  parameters: {
    percy: { skip: true },
  },
};

export const Required = {
  render: (_args, { argTypes }) => ({
    components: { HdGoogleAutocomplete },
    template: `
    <p v-if="!apiKey">You have to enter a valid API key under "Controls"</p>
    <HdGoogleAutocomplete
      v-else
      :key="apiKey"
      v-model="value"
      :required="true"
      :apiKey="apiKey"
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
    props: Object.keys(argTypes),
  }),
  args: {
    apiKey: '',
  },
  argTypes: {
    apiKey: {
      name: 'API Key',
      control: { type: 'text' },
    },
  },

  name: 'required 🎛',
};

export const Prefilled = {
  render: (_args, { argTypes }) => ({
    components: { HdGoogleAutocomplete },
    template: `
    <p v-if="!apiKey">You have to enter a valid API key under "Controls"</p>
    <HdGoogleAutocomplete
      v-else
      :key="apiKey"
      v-model="value"
      :apiKey="apiKey"
      name="test"
      label="Label"
      placeholder="Placeholder..."
    />
  `,
    data() {
      return {
        value: 'Berlin',
      };
    },
    props: Object.keys(argTypes),
  }),
  args: {
    apiKey: '',
  },
  argTypes: {
    apiKey: {
      name: 'API Key',
      control: { type: 'text' },
    },
  },

  name: 'prefilled 🎛',
};

export const CustomTranslation = {
  render: (_args, { argTypes }) => ({
    components: { HdGoogleAutocomplete },
    template: `
    <p v-if="!apiKey">You have to enter a valid API key under "Controls"</p>
    <HdGoogleAutocomplete
      v-else
      :key="apiKey"
      v-model="value"
      :required="true"
      :texts="texts"
      :apiKey="apiKey"
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
    props: Object.keys(argTypes),
  }),
  args: {
    apiKey: '',
  },
  argTypes: {
    apiKey: {
      name: 'API Key',
      control: { type: 'text' },
    },
  },

  name: 'custom translation 🎛',
};

export const Disabled = {
  render: (_args, { argTypes }) => ({
    components: { HdGoogleAutocomplete },
    template: `
    <p v-if="!apiKey">You have to enter a valid API key under "Controls"</p>
    <HdGoogleAutocomplete
      v-else
      :key="apiKey"
      v-model="value"
      :required="true"
      :texts="texts"
      :apiKey="apiKey"
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
    props: Object.keys(argTypes),
  }),
  args: {
    apiKey: '',
  },
  argTypes: {
    apiKey: {
      name: 'API Key',
      control: { type: 'text' },
    },
  },

  name: 'disabled 🎛',
};
