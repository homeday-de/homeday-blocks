/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import HdTextarea from 'homeday-blocks/src/components/form/HdTextarea.vue';
import FormWrapper from 'homeday-blocks/src/storiesWrappers/FormWrapper';
import icon from './assets/ic_user.svg';

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
  }), { percy: { skip: true } })
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
  }))
  .add('with icon', () => ({
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
  }));
