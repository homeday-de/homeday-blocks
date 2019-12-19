/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';

import HdGoogleAutocomplete from 'hd-blocks/components/form/HdGoogleAutocomplete.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';

storiesOf('Form/HdGoogleAutocomplete', module)
  .addParameters({ percy: { skip: true } })
  .addDecorator(FormWrapper)
  .add('required 🎛', () => ({
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
    props: {
      apiKey: {
        type: String,
        default: text('API Key', ''),
      },
    },
  }))
  .add('prefilled 🎛', () => ({
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
    props: {
      apiKey: {
        type: String,
        default: text('API Key', ''),
      },
    },
  }))
  .add('custom translation 🎛', () => ({
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
    props: {
      apiKey: {
        type: String,
        default: text('API Key', ''),
      },
    },
  }))
  .add('disabled 🎛', () => ({
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
    props: {
      apiKey: {
        type: String,
        default: text('API Key', ''),
      },
    },
  }));
