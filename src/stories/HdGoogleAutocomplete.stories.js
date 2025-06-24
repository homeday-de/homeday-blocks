/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import HdGoogleAutocomplete from 'homeday-blocks/src/components/form/HdGoogleAutocomplete.vue';

storiesOf('Components/Forms/HdGoogleAutocomplete', module)
  .addParameters({ percy: { skip: true } })
  .addDecorator(FormWrapper)
  .add(
    'required 🎛',
    (args) => ({
      components: { HdGoogleAutocomplete },
      template: `
      <p v-if="!apiKey">You have to enter a valid API key under "Knobs"</p>
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
      props: Object.keys(args),
    }),
    {
      args: {
        apiKey: '',
      },
      argTypes: {
        apiKey: {
          name: 'API Key',
          control: { type: 'text' },
        },
      },
    }
  )
  .add(
    'prefilled 🎛',
    (args) => ({
      components: { HdGoogleAutocomplete },
      template: `
      <p v-if="!apiKey">You have to enter a valid API key under "Knobs"</p>
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
      props: Object.keys(args),
    }),
    {
      args: {
        apiKey: '',
      },
      argTypes: {
        apiKey: {
          name: 'API Key',
          control: { type: 'text' },
        },
      },
    }
  )
  .add(
    'custom translation 🎛',
    (args) => ({
      components: { HdGoogleAutocomplete },
      template: `
      <p v-if="!apiKey">You have to enter a valid API key under "Knobs"</p>
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
      props: Object.keys(args),
    }),
    {
      args: {
        apiKey: '',
      },
      argTypes: {
        apiKey: {
          name: 'API Key',
          control: { type: 'text' },
        },
      },
    }
  )
  .add(
    'disabled 🎛',
    (args) => ({
      components: { HdGoogleAutocomplete },
      template: `
      <p v-if="!apiKey">You have to enter a valid API key under "Knobs"</p>
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
      props: Object.keys(args),
    }),
    {
      args: {
        apiKey: '',
      },
      argTypes: {
        apiKey: {
          name: 'API Key',
          control: { type: 'text' },
        },
      },
    }
  );
