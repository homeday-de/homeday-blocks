/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdTextarea from 'hd-blocks/components/form/HdTextarea.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';

storiesOf('Form/HdTextarea', module)
  .addDecorator(FormWrapper)
  .add('required', () => ({
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
  }))
  .add('prefilled', () => ({
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
  }))
  .add('custom translation', () => ({
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
  }))
  .add('disabled', () => ({
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
  }));
