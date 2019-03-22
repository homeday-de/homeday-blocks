/* eslint-disable import/no-extraneous-dependencies, no-console */
import { storiesOf } from '@storybook/vue';

import HdDynamicForm from 'hd-blocks/components/form/HdDynamicForm.vue';
import FormWrapper from 'hd-blocks/storiesWrappers/FormWrapper';
import { formatNestedData } from 'hd-blocks/services/utils';
import CONFIG from './mocks/forms';

storiesOf('Form/HdDynamicForm', module)
  .addDecorator(FormWrapper)
  .add('profile', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
    data() {
      return {
        config: CONFIG.PROFILE,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
    },
  }))
  .add('signup', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
    data() {
      return {
        config: CONFIG.SIGNUP,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
    },
  }))
  .add('login', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" @submit="onSubmit"/>',
    data() {
      return {
        config: CONFIG.LOGIN,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
    },
  }))
  .add('specified language', () => ({
    components: { HdDynamicForm },
    template: '<hd-dynamic-form :items="config" submitLabel="Submit Label" lang="en" @submit="onSubmit"/>',
    data() {
      return {
        config: CONFIG.LOGIN_EN,
      };
    },
    methods: {
      onSubmit({ data, isValid, invalidFields }) {
        console.log('invalidFields', invalidFields);
        console.log('isValid', isValid);
        console.log('data', data);
        console.log(
          'Nested data',
          formatNestedData(data),
        );
      },
    },
  }));
